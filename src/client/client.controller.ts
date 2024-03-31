import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ClientService } from './client.service';
import { APIException } from 'src/common/dto/APIException.dto';

@ApiTags('Common - Client Information')
@Controller('client')
export class ClientController {
  private readonly logger = new Logger(ClientController.name);

  constructor(private readonly clientService: ClientService) {}

  @Get('maintenance')
  @ApiOperation({
    summary: '현재 점검여부 확인',
    description: '왁타플레이 서비스가 현재 점검 중인지 확인합니다.',
  })
  async maintenance() {
    return await this.clientService.getMaintenance();
    // return {};
  }

  @Get('update')
  @ApiOperation({
    summary: '클라이언트 업데이트 확인',
    description: '사용자의 클라이언트에 업데이트가 존재하는지 확인합니다.',
  })
  async update(@Query('os') os: string, @Query('version') version: string) {
    if (!os || !version) {
      throw new APIException(400, "'os'와 'version' 파라미터는 필수입니다.");
    }

    if (!['ios', 'android', 'pc'].includes(os)) {
      throw new APIException(
        400,
        "'os' 파라미터는 'ios' 또는 'android', 'pc' 만 허용됩니다.",
      );
    }

    return await this.clientService.update(os, version);
    // return {};
  }
}
