import {
  CreateRelatedNodeDto,
  CreateTreeDto,
  UpdateNodeDto,
} from '@app/contracts';
import { GenealogyService } from '@app/gateway/genealogy-service/genealogy.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { Request, Response } from 'express';

@Controller('trees')
export class GenealogyController {
  constructor(private readonly genealogyService: GenealogyService) {}

  // -------------------- TREES --------------------
  @Post()
  async createTree(
    @Body() dto: CreateTreeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const treeId = await this.genealogyService.createTree(dto);
    const location = `${req.protocol}://${req.get('host')}${req.baseUrl}/api/trees/${treeId}`;
    return res.location(location).status(HttpStatus.CREATED).send();
  }

  @Get(':id')
  getTree(@Param('id') id: UUID) {
    return this.genealogyService.getTree(id);
  }

  @Get(':id/genealogy')
  getTreeGenealogy(@Param('id') id: UUID) {
    return this.genealogyService.getTreeGenealogy(id);
  }

  @Get()
  getTrees() {
    return this.genealogyService.getTrees();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTree(@Param('id') id: UUID) {
    return this.genealogyService.deleteTree(id);
  }

  // -------------------- NODES --------------------
  @Post(':id/nodes')
  async createNode(
    @Param('id') treeId: UUID,
    @Body() dto: CreateRelatedNodeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const nodeId = await this.genealogyService.createNode(treeId, dto);
    const location = `${req.protocol}://${req.get('host')}${req.baseUrl}/api/trees/${treeId}/nodes/${nodeId}`;
    return res.location(location).status(HttpStatus.CREATED).send();
  }

  @Get(':id/nodes/:id2')
  getNode(@Param('id') treeId: UUID, @Param('id2') nodeId: UUID) {
    return this.genealogyService.getNode(treeId, nodeId);
  }

  @Get(':id/nodes')
  getNodes(@Param('id') treeId: UUID) {
    return this.genealogyService.getNodes(treeId);
  }

  @Delete(':id/nodes/:id2')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteNode(@Param('id') treeId: UUID, @Param('id2') nodeId: UUID) {
    return this.genealogyService.deleteNode(treeId, nodeId);
  }

  @Patch(':id/nodes/:id2')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateNode(
    @Param('id') treeId: UUID,
    @Param('id2') nodeId: UUID,
    @Body() dto: UpdateNodeDto,
  ) {
    return this.genealogyService.updateNode(treeId, nodeId, dto);
  }
}
