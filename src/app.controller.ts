import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

class rootAccessDto {
  /**
   * Default return
   * @example hacking
   */
  @ApiProperty({ example: 'hacking' })
  happy: string = 'hacking';
}

@ApiTags('Common - Health Check API')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Health Check',
    description: 'Check the server is running',
  })
  rootAccess(): rootAccessDto {
    return { happy: 'hacking' };
  }
}
