import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/ui/laptops/index.html', 302)
  redirectToUi() {}
}
