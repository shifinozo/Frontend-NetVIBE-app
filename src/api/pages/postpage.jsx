import { useParams, useNavigate } from "react-router-dom";
import PostModal from "../components/PostModal";

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <PostModal
      postId={postId}
      onClose={() => navigate(-1)}
      onDelete={() => navigate(-1)}
    />
  );
}
