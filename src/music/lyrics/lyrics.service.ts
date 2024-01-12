import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';

import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

import { APIError } from 'src/common/dto/APIError.dto';
import { LyricsDto } from './dto/lyrics.dto';

@Injectable()
export class LyricsService {
  private readonly logger = new Logger(LyricsService.name);

  constructor(private readonly httpService: HttpService) {}

  async getLyricsFile(
    id: string,
    ext: 'srt' | 'txt' = 'srt',
  ): Promise<LyricsDto[]> {
    try {
      const { data: lyricsFile } = await firstValueFrom(
        this.httpService
          .get(`http://nas.waktaplay.com:5500/deployed/${id}.${ext}`)
          .pipe(
            catchError((err: AxiosError) => {
              this.logger.error(err);
              throw new APIError(
                err.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.response.status === 404
                  ? '해당 곡의 가사 파일이 존재하지 않습니다.'
                  : '내부 서버 오류가 발생했습니다.',
              );
            }),
          ),
      );

      return this.parseSubtitle(lyricsFile);
    } catch (err) {
      if (err._status === 404 && ext === 'srt') {
        return this.getLyricsFile(id, 'txt');
      }

      throw err;
    }
  }

  parseSubtitle(fileData: string): LyricsDto[] {
    const data: LyricsDto[] = [];

    const lines = fileData
      .trim()
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0);

    let skipWEBVTT = false;
    let lastStatus = 0;
    let tmpTimeData = { start: 0, end: 0 };
    let index = 0;

    lines.forEach((line) => {
      if (!skipWEBVTT && line.trim().toUpperCase() === 'WEBVTT') {
        skipWEBVTT = true;
      } else if (Number(line)) {
        lastStatus = 0;
      } else if (line.includes('-->')) {
        const [start, end] = line
          .split('-->')
          .map((time) => this.convertTimeToSec(time));
        tmpTimeData = { start, end };
        lastStatus = 1;
      } else {
        if (lastStatus === 1) {
          data.push({ ...tmpTimeData, subtitle: [line], index });
        } else {
          data[data.length - 1].subtitle.push(line);
        }
        index++;
        lastStatus = 3;
      }
    });

    return data;
  }

  convertTimeToSec(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map((time, i) => {
      if (i < 2) {
        return parseInt(time);
      } else {
        return parseFloat(time.replace(',', '.'));
      }
    });

    return hours * 3600 + minutes * 60 + seconds;
  }
}
