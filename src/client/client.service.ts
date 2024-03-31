import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

import { IMaintenance } from 'src/common/repository/schemas/maintenance.schema';
import { IVersion } from 'src/common/repository/schemas/version.schema';

import { UpdateResponseDto } from './dto/updateResponse.dto';
import { APIException } from 'src/common/dto/APIException.dto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @Inject('MAINTENANCE_MODEL')
    private readonly maintenanceModel: Model<IMaintenance>,
    @Inject('CLIENTVERSION_MODEL')
    private readonly clientVersionModel: Model<IVersion>,
  ) {}

  async getMaintenance(): Promise<IMaintenance> {
    const maintenanceData = await this.maintenanceModel
      .find()
      .select({ _id: 0, __v: 0 })
      .sort({ date: -1 });

    return (
      maintenanceData.find(
        (maintenance) => maintenance.date.end >= new Date(),
      ) || null
    );
  }

  async update(os: string, version: string): Promise<UpdateResponseDto> {
    const versions = await this.clientVersionModel.find({ os });
    const updateUrl = {
      ios: 'https://apps.apple.com/kr/app/id',
      android:
        'https://play.google.com/store/apps/details?id=com.waktaplay.mobile',
      pc: null,
    }[os];

    if (!versions.length) {
      throw new APIException(404, '업데이트 정보를 찾을 수 없습니다.');
    }

    const latestVersion = versions.reduce((prev, curr) =>
      prev.version > curr.version ? prev : curr,
    );

    return {
      // 업데이트가 필요한지 여부
      // 현재 버전이 최신 버전보다 낮은 경우 true
      needUpdate: version < latestVersion.version,

      os: latestVersion.os,
      updateUrl,

      version: latestVersion.version,
      specialLogo: latestVersion.specialLogo,
    };
  }
}
