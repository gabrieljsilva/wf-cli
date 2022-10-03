import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UploadMetadata } from '../../config/database/postgres/entities';
import { FileUpload } from 'graphql-upload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { UploadService } from './upload.service';
import { Permission } from '../../shared/constants/permissions/permission.enum';
import { RequirePermissions } from '../../shared/decorators';

@Resolver(UploadMetadata)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @RequirePermissions(Permission.UPLOAD_FILE)
  @Mutation(() => UploadMetadata)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.uploadService.upload(file);
  }

  @RequirePermissions(Permission.DELETE_UPLOADED_FILE)
  @Mutation(() => UploadMetadata)
  async deleteFile(@Args('key', { type: () => String }) key: string) {
    return this.uploadService.delete(key);
  }
}
