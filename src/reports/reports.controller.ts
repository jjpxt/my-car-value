import { User } from 'src/users/user.entity';
import { ReportDto } from './DTOs/report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './DTOs/get-estimate.dto';
import { CreateReportDto } from './DTOs/create-report.dto';
import { ApproveReportDto } from './DTOs/approve-report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorator/current-user.decorator';
import { Body, Controller, Post, Patch, Param, UseGuards, Get, Query } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }

    @Post()
    @Serialize(ReportDto)
    @UseGuards(AuthGuard)
    createRequest(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.changeApproval(id, body.approved);
    }
}
