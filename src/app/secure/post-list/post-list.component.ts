import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecureService } from '../service/secure.service';
import { ApiService } from '@app/shared/services/api/api.service';
import { SinglePost } from '@app/models/post.model';
import { PostComment } from '@app/models/comment.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  user;
  URL = {
    singlepost: 'api/singlepost',
    comment: 'api/comment',
  }
  allpost: Array<SinglePost> = [];
  comment = {};
  constructor(
    public $api: ApiService,
    private $route: Router, private $secure: SecureService
  ) { 
    this.user = this.$secure.getDecodedAccessToken()
  }

  ngOnInit() {
    this.getAllPost()
  }


  addPost() {
    this.$route.navigate(['secure/add-post'])
  }

  async getAllPost() {
    this.$api.getAll(this.URL.singlepost).subscribe(allpost => {
      this.allpost = allpost.data.map(post=> new SinglePost(post));
      this.allpost.forEach(async (post) => {
        let comment: any = await this.$api.getAll(this.URL.comment, {
          dataQuery: JSON.stringify({ "where": { singlepost: post._id } })
        }).toPromise();
        comment &&  comment.data.forEach(element => {
          post.comments.push(new PostComment(element))
        });
      })

    })
  }

  shouldShowAddbtn() {
    let tmp = localStorage.getItem('token') || '';
    return !!tmp
  }

  removeComment(id){
    this.$api.delete(this.URL.comment,id).subscribe(data=>{
      this.getAllPost()
    })
  }
  addComment(post) {
    let comment = new PostComment();
    comment.setcomment(this.comment[post._id]);
    comment.setuserId( this.$secure.getDecodedAccessToken()._id )
    comment.setsinglepost(post._id);

    this.$api.save(this.URL.comment, comment.getExpose()).subscribe(singlePost => {
      this.comment[post._id] = '';
      this.getAllPost()

    })
  }

  login(){
    this.$route.navigate(['login'])
  }
  logout(){
    localStorage.clear();
    // this.$route.navigate(['login'])
  }
  isMyComment(comment){
  if(!this.user) return false;
    return comment.userId == this.user._id;
  }
}
