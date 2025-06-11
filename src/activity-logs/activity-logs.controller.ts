import { Controller, Get } from '@nestjs/common';

@Controller('activity-logs')
export class ActivityLogsController {
  @Get()
  getAllLogs(): string {
    return 'Lista de logs de atividade';
  }
}
