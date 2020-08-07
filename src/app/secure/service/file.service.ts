import { Injectable } from '@angular/core';
import * as _ from 'lodash';  
import { map } from 'rxjs/operators';
import { ApiService } from '@app/shared/services/api/api.service';
 
@Injectable()
export class FileUploadService {

    constructor(private $api: ApiService) { }

    downloadFile(file: any) {
        file = _.isArray(file) ? file[0] : file;
          return this.$api.apiUrl + '/file/'+ file.title;
        
    }

    uploadFile(fileToUpload) {
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        const endpoint = 'file';
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.$api.post(endpoint, formData)
         .pipe(map(fileData => {
            return fileData;
        }))
    }

}