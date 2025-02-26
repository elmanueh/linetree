import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TreesService {
  constructor(private readonly httpService: HttpService) {}

  async create(body: any): Promise<any> {
    const response = await this.httpService.axiosRef.post(
      'http://localhost:3000/api/trees',
      body,
    );
    return response.data;
  }

  async findAll(): Promise<any> {
    const response = await this.httpService.axiosRef.get(
      'http://localhost:3000/api/trees',
    );
    return response.data;
  }

  async findOne(id: string): Promise<any> {
    const response = await this.httpService.axiosRef.get(
      `http://localhost:3000/api/trees/${id}`,
    );
    return response.data;
  }

  async remove(id: string): Promise<any> {
    const response = await this.httpService.axiosRef.delete(
      `http://localhost:3000/api/trees/${id}`,
    );
    return response.data;
  }

  async createNode(id: string): Promise<any> {
    const response = await this.httpService.axiosRef.post(
      `http://localhost:3000/api/trees/${id}/nodes`,
    );
    return response.data;
  }

  async findAllNodes(id: string): Promise<any> {
    const response = await this.httpService.axiosRef.get(
      `http://localhost:3000/api/trees/${id}/nodes`,
    );
    return response.data;
  }

  async findOneNode(id: string, id2: string): Promise<any> {
    const response = await this.httpService.axiosRef.get(
      `http://localhost:3000/api/trees/${id}/nodes/${id2}`,
    );
    return response.data;
  }

  async removeNode(id: string, id2: string): Promise<any> {
    const response = await this.httpService.axiosRef.delete(
      `http://localhost:3000/api/trees/${id}/nodes/${id2}`,
    );
    return response.data;
  }
}
