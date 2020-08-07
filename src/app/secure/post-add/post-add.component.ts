import { Component, OnInit } from '@angular/core';
import { SinglePost } from '@app/models/post.model';
import { ApiService } from '@app/shared/services/api/api.service';
import { SecureService } from '../service/secure.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EXTENTION } from '@app/constant/GeneralSetting';
import { Observable } from 'rxjs';
import { FileUploadService } from '../service/file.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  singlePost = new SinglePost();
  extention =  EXTENTION
  URL = {
    singlepost: 'api/singlepost',
  }
  singlePostId: string;
  constructor(private $state: ActivatedRoute, private $api: ApiService,
    private $route: Router, private $secure: SecureService,
    private $file:FileUploadService
    
    ) { }

  ngOnInit() {

  }


  getSinglePost() {
    this.$state.params.subscribe(query => {
      this.singlePostId = query.singlePostId;
      if (this.singlePostId != 'new') {
        this.$api.getById(this.URL.singlepost, this.singlePostId).subscribe(singlepost => {
           this.singlePost = new SinglePost(singlepost);
        });
      }
    });
  }


  savePost(form: NgForm) {
    if (form.invalid) {
      this.$secure.checkForm(form);
      return;
    }
    this.$api.save(this.URL.singlepost, this.singlePost.getExpose()).subscribe(singlePost => {
      this.singlePost = new SinglePost(); 
      this.listPost();
    })
  }

  listPost() {
    this.$route.navigate(['secure/list-post']);
  }


  onFileSelected(files) {
    if (this.extention.includes(files.item(0).name.split('.')[files.item(0).name.split('.').length-1])) {

      const fileToUpload = files.item(0);
      const formData: FormData = new FormData();
      formData.append('fileKey', fileToUpload, fileToUpload.name);
      this.postFile(fileToUpload).subscribe((data:any) => {
        this.singlePost.image = data.file; 
      }, error => {
        console.log(error);
      });
    } else {
       
    }
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'file';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.$api.post(endpoint, formData).pipe(map((data) => { return data; }));
  }

  downloadFile(file?) {
    window.open(this.$file.downloadFile(file || this.singlePost.image));
  }

  removeFileOrURL(){
    this.singlePost.image = '';
  }

}
