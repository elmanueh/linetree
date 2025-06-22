import {
  CreateRelatedNodeDto,
  CreateTreeDto,
  UpdateNodeDto,
} from '@app/contracts';
import { GenealogyService } from '@gateway/genealogy-service/genealogy.service';
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
    const user = req.user as UUID;
    const treeId = await this.genealogyService.createTree(dto, user);
    const location = `${req.protocol}://${req.get('host')}${req.baseUrl}/api/trees/${treeId}`;
    return res.location(location).status(HttpStatus.CREATED).send();
  }

  @Get(':id')
  getTree(@Req() req: Request, @Param('id') id: UUID) {
    const user = req.user as UUID;
    return this.genealogyService.getTree(id, user);
  }

  @Get(':id/genealogy')
  getTreeGenealogy(@Req() req: Request, @Param('id') id: UUID) {
    const user = req.user as UUID;
    return this.genealogyService.getTreeGenealogy(id, user);
  }

  @Get()
  getTrees(@Req() req: Request) {
    const user = req.user as UUID;
    return this.genealogyService.getTrees(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTree(@Req() req: Request, @Param('id') id: UUID) {
    const user = req.user as UUID;
    return this.genealogyService.deleteTree(id, user);
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

  // -------------------- IMPORT / EXPORT --------------------

  @Post('/gedcom')
  @HttpCode(HttpStatus.CREATED)
  async importTree(
    @Body() dto: { gedcom: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const treeId = await this.genealogyService.importTree(dto.gedcom);
    const location = `${req.protocol}://${req.get('host')}${req.baseUrl}/api/trees/${treeId}`;
    return res.location(location).status(HttpStatus.CREATED).send();
  }

  @Get(':id/gedcom')
  async exportTree(@Param('id') id: UUID) {
    return this.genealogyService.exportTree(id);
  }
}
