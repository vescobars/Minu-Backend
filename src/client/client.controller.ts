import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClientService } from './client.service';

@Controller('client')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClientController {
    constructor(private readonly clientService:ClientService){}
}
