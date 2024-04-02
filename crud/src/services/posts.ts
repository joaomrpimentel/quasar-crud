import useApi from '../composables/UseApi';

export default function postsService (){
    const{ list , post, update, remove } = useApi('posts');

    return{
        list, post, update, remove
    }
}