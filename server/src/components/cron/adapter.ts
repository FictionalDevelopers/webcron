export interface Adapter {
  registerTask(options: RegisterTaskOptions): Promise<void>;
}

export interface RegisterTaskOptions {
  id: string;
  url: string;
  schedule: string;
}
