export const getLikedPosts = () => {
    return JSON.parse(localStorage.getItem("likedPosts") || "[]");
  };
  
  export const isPostLiked = (postId) => {
    const liked = getLikedPosts();
    return liked.includes(postId);
  };
  
  export const togglePostLike = (postId) => {
    let liked = getLikedPosts();
    if (liked.includes(postId)) {
      liked = liked.filter((id) => id !== postId);
    } else {
      liked.push(postId);
    }
    localStorage.setItem("likedPosts", JSON.stringify(liked));
    return liked; // Return boolean after toggle
  };
  
  export const getLikeCount = (postId) => {
    const liked = getLikedPosts();
    return liked.includes(postId) ? 1 : 0;
  };
  