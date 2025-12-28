import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as FormData from 'form-data';
import { SingleSpeciesIdentificationResponse } from './interfaces/SingleSpeciesIdentificationResponse.interface';
import { DiseasesIdentificationResponse } from './interfaces/DiseasesIdentificationResponse.inteface';
import { VarietiesIdentificationResponse } from './interfaces/VarietiesIdentificationResponse.interface';

@Injectable()
export class PlantNetService {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://my-api.plantnet.org',
    });
  }

  async SingleSpeciesIdentification(
    file: Express.Multer.File,
  ): Promise<Pick<SingleSpeciesIdentificationResponse, 'results'>> {
    try {
      const formData = new FormData();

      formData.append('images', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      formData.append('organs', 'auto');

      const { data } = await this.api.post<SingleSpeciesIdentificationResponse>(
        `/v2/identify/all`,
        formData,
        {
          params: {
            'include-related-images': false,
            'no-reject': false,
            'nb-results': 1,
            lang: 'en',
            detailed: true,
            type: 'kt',
            'api-key': process.env.KEY_PLANT_NET,
          },
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 15000,
        },
      );

      return { results: data.results };
    } catch (error) {
      throw new Error(error);
    }
  }

  async DiseasesIdentification(
    file: Express.Multer.File,
  ): Promise<Pick<DiseasesIdentificationResponse, 'results'>> {
    try {
      const formData = new FormData();

      formData.append('images', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      formData.append('organs', 'auto');

      const { data } = await this.api.post<DiseasesIdentificationResponse>(
        `/v2/diseases/identify`,
        formData,
        {
          params: {
            'include-related-images': true,
            'no-reject': false,
            'nb-results': 5,
            lang: 'en',
            'api-key': process.env.KEY_PLANT_NET,
          },
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 15000,
        },
      );

      return { results: data.results };
    } catch (error) {
      throw new Error(error);
    }
  }

  async VarietiesIdentification(
    file: Express.Multer.File,
  ): Promise<Pick<VarietiesIdentificationResponse, 'results'>> {
    try {
      const formData = new FormData();

      formData.append('images', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      formData.append('organs', 'auto');

      const { data } = await this.api.post<VarietiesIdentificationResponse>(
        `/v2/varieties/identify`,
        formData,
        {
          params: {
            'include-related-images': true,
            'no-reject': false,
            'nb-results': 5,
            lang: 'en',
            'api-key': process.env.KEY_PLANT_NET,
          },
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 15000,
        },
      );

      return { results: data.results };
    } catch (error) {
      throw new Error(error);
    }
  }
}
