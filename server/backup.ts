import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface BackupOptions {
  sourcePath: string;
  backupDir: string;
  maxBackups?: number;
  compress?: boolean;
}

export class DatabaseBackup {
  private options: Required<BackupOptions>;

  constructor(options: BackupOptions) {
    this.options = {
      maxBackups: 10,
      compress: true,
      ...options,
    };
  }

  async createBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${timestamp}.db`;
    const backupPath = path.join(this.options.backupDir, backupFileName);
    
    // Ensure backup directory exists
    if (!fs.existsSync(this.options.backupDir)) {
      fs.mkdirSync(this.options.backupDir, { recursive: true });
    }

    try {
      // Copy the database file
      fs.copyFileSync(this.options.sourcePath, backupPath);
      
      // Compress if requested
      if (this.options.compress) {
        const compressedPath = `${backupPath}.gz`;
        await execAsync(`gzip "${backupPath}"`);
        return compressedPath;
      }
      
      return backupPath;
    } catch (error) {
      throw new Error(`Backup failed: ${error.message}`);
    }
  }

  async cleanupOldBackups(): Promise<void> {
    try {
      const files = fs.readdirSync(this.options.backupDir)
        .filter(file => file.startsWith('backup-') && (file.endsWith('.db') || file.endsWith('.db.gz')))
        .map(file => ({
          name: file,
          path: path.join(this.options.backupDir, file),
          stats: fs.statSync(path.join(this.options.backupDir, file)),
        }))
        .sort((a, b) => b.stats.mtime.getTime() - a.stats.mtime.getTime());

      // Remove old backups if we exceed the limit
      if (files.length > this.options.maxBackups) {
        const filesToRemove = files.slice(this.options.maxBackups);
        for (const file of filesToRemove) {
          fs.unlinkSync(file.path);
          console.log(`Removed old backup: ${file.name}`);
        }
      }
    } catch (error) {
      console.error('Error cleaning up old backups:', error);
    }
  }

  async performBackup(): Promise<string> {
    console.log('Starting database backup...');
    
    try {
      const backupPath = await this.createBackup();
      await this.cleanupOldBackups();
      
      console.log(`Backup completed: ${backupPath}`);
      return backupPath;
    } catch (error) {
      console.error('Backup failed:', error);
      throw error;
    }
  }
}

// Scheduled backup function
export function scheduleBackups(intervalHours: number = 24): void {
  const backup = new DatabaseBackup({
    sourcePath: process.env.SQLITE_DATABASE_PATH || './sqlite.db',
    backupDir: './backups',
    maxBackups: 30, // Keep 30 days of backups
    compress: true,
  });

  // Perform initial backup
  backup.performBackup().catch(console.error);

  // Schedule regular backups
  setInterval(() => {
    backup.performBackup().catch(console.error);
  }, intervalHours * 60 * 60 * 1000);

  console.log(`Scheduled backups every ${intervalHours} hours`);
}

// Manual backup endpoint
export async function createManualBackup(): Promise<{ success: boolean; path?: string; error?: string }> {
  try {
    const backup = new DatabaseBackup({
      sourcePath: process.env.SQLITE_DATABASE_PATH || './sqlite.db',
      backupDir: './backups',
      maxBackups: 30,
      compress: true,
    });

    const backupPath = await backup.performBackup();
    return { success: true, path: backupPath };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
