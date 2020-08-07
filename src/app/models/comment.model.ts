import { Base, BaseInterface } from "./base.model";

export class PostComment extends Base implements BaseInterface{
    singlepost:string = undefined;
    comment : string = undefined;
    userId:string = undefined;

    internals:Array<string>=[]; 
    constructor(postComment?){
        super();
        this.setInstance(postComment);
    }

    isMyComment(id){
        return  this.userId == id;
    }

    setuserId(userId){
        this.userId = userId;
    }

    setsinglepost(singlepost){
        this.singlepost = singlepost;
    }
    
    setcomment(comment){
        this.comment = comment
    }
}
  