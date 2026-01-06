

export default function ProfilePage() {
  const { username } = useParams();
  const [editprofile, seteditProfile] = useState(null);
  

  useEffect(() => {
    const editProfile = async () => {
      try {
        const res = await api.get(`/getUserProfile/${username}`);
        seteditProfile(res.data);
      } catch (err) {
        console.error("Profile edit failed", err);
      } 
    };

    editProfileProfile();
  }, [username]);

}