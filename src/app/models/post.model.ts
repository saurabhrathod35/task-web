import { Base, BaseInterface } from "./base.model";
import { PostComment } from "./comment.model";

export class SinglePost extends Base implements BaseInterface{
    title:string=undefined;
    description:string=undefined;
    image:string=undefined;
    comments:Array<any> = []
    internals:Array<string>=[]; 
    constructor(singlePost?){
        super();
        this.setInstance(singlePost);
    }

}
  