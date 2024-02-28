import {
  Body,
  Patch,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditBookmarkDto,CreateBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get(':id')
  getBookmark(@GetUser('id') userId:number, @Param('id', ParseIntPipe) id: number) {
    
    return this.bookmarkService.getBookmark(userId,id);
  }
  @Get()
  getAllBookmarks() {
    return this.bookmarkService.getAllBookmarks();
  }
  @Post('/add')
  createBookmarks(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmarks(userId, dto);
  }

  @Patch(':id')
  editBookmark(@GetUser('id') userId:number,@Param('id',ParseIntPipe) id:number,@Body() dto:EditBookmarkDto){
    return this.bookmarkService.editBookmark(id,userId,dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBookmark(@GetUser('id') userId:number,@Param('id',ParseIntPipe) id:number){
    return this.bookmarkService.deleteBookmark(id,userId);
  }
}
