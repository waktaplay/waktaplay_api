import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

class rootAccessDto {
  /**
   * Default return
   */
  happy = 'hacking';
}

@ApiTags('Common - Health Check API')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Health Check',
    description: '서버 상태를 확인합니다.',
  })
  @ApiOkResponse({
    description: '서버가 정상적으로 작동 할 경우',
    type: rootAccessDto,
  })
  rootAccess(): rootAccessDto {
    return { happy: 'hacking' };
  }
}
