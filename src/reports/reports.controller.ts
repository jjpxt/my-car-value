import { User } from 'src/users/user.entity';
import { ReportDto } from './DTOs/report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { CreateReportDto } from './DTOs/create-report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/users/decorator/current-user.decorator';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Post()
    @Serialize(ReportDto)
    @UseGuards(AuthGuard)
    createRequest(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }
}
