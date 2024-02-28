import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { EditBookmarkDto,CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getAllBookmarks() {
    const bookmarks = this.prisma.bookmark.findMany({});
    return bookmarks;
  }

  async getBookmark(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    return bookmark;
  }

  async createBookmarks(userId: number, dto: CreateBookmarkDto) {
    //Will add the bookmarks to the DB
    const bookmark = await this.prisma.bookmark.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
    return bookmark;
  }
  async editBookmark(id:number,userId:number,dto:EditBookmarkDto){
    const oldBookmark = await this.prisma.bookmark.findUnique({
      where:{
        id,
      }
    })
    if(!oldBookmark || oldBookmark.userId != userId){
      throw new ForbiddenException('Data not found or User is not authorized to delete the dat')
    }
    const bookmark = await this.prisma.bookmark.update({
      where:{
        id,
      },
      data:{
        ...dto
      }
    })
    return bookmark
  }

  async deleteBookmark(id:number,userId:number){
    const oldBookmark = await this.prisma.bookmark.findUnique({
      where:{
        id,
      }
    })
    if(!oldBookmark || oldBookmark.userId != userId){
      throw new ForbiddenException('Data not found or User is not authorized to delete the data')
    }
   await this.prisma.bookmark.delete({
    where:{
      id,
    }
   })
  }
}
