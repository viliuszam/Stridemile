import { Controller, Post, Body, Delete } from '@nestjs/common';
import { CreateStatisticsDto } from './dto/create-statistics.dto';
import { HealthTrackingService } from './health-tracking.service';
import { AuthGuard } from '@nestjs/passport';
import { Get, Param, HttpStatus, HttpException, NotFoundException, UseGuards, Request, UploadedFiles, ParseIntPipe } from '@nestjs/common';


@Controller('health-tracking')
export class HealthTrackingController {
  constructor(private readonly healthTrackingService: HealthTrackingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('createStats')
  async createStats(@Body() createStatisticsDto: CreateStatisticsDto,  @Request() req) {
    try {
      const userId = req.user.id;
      var { sleep, calories, macroelements, water, weight } = req.body;
      
      const createStatisticsDto: CreateStatisticsDto = {
        sleep,
        calories,
        macroelements,
        water,
        weight,
        userId
      };

      const createdStats = await this.healthTrackingService.createStatistics(createStatisticsDto);
      return {
        message: 'Record created successfully',
        group: createdStats,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getStats')
  async findUserGroups(@Request() req) {
    const userId = req.user.id;
    return this.healthTrackingService.getUserHealthTrackingInfo(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteStats/:id')
  async deleteStatistic(@Param('id') id: string): Promise<void> {
    return this.healthTrackingService.deleteStatistics(parseInt(id, 10));
  }
}