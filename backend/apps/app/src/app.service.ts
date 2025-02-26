import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  readonly USER_SERVICE: string = 'http://localhost:3001';

  constructor(private readonly httpService: HttpService) {}

  async register(body: any): Promise<any> {
    const response = await this.httpService.axiosRef.post(
      `${this.USER_SERVICE}/users`,
      body,
    );
    return response.data;
  }

  async login(body: any): Promise<any> {
    const response = await this.httpService.axiosRef.post(
      `${this.USER_SERVICE}/users/${body.id}`,
      body,
    );
    return response.data;
  }

  async getUser(id: string): Promise<any> {
    const response = await this.httpService.axiosRef.get(
      `${this.USER_SERVICE}/users/${id}`,
    );
    return response.data;
  }

  async deleteUser(id: string): Promise<any> {
    const response = await this.httpService.axiosRef.delete(
      `${this.USER_SERVICE}/users/${id}`,
    );
    return response.data;
  }
}
