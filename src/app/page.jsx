import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";
import PostCard from "@/components/postCard/postCard";




// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};


const Home = async() => {

   // FETCH DATA WITH AN API
   const posts = await getData();
  return (
    <>
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Bolder Creativity.</h1>
        <p className={styles.desc}>         
          Welcome to Trendzipper, where we don&apos;t just market brands; 
          we craft compelling narratives that resonate, captivate, and leave a lasting 
          impression. Our team of innovative minds understands that each brand has a unique 
          story waiting to be told, and we&apos;re here to bring it to life.
        </p>
        <div className={styles.buttons}>
          <Link href="/about"><button className={styles.button}>Learn More</button></Link>
          <Link href="/contact"><button className={styles.button}>Contact</button></Link>
        </div>
        <div className={styles.brands}>
          <Image src="/brands.png" alt="" fill className={styles.brandImg}/>
        </div>
      </div>
      <div className={styles.imgContainer}> 
        <Image src="/hero.png" alt="" fill className={styles.heroImg}/>
      </div>
    </div>
    <div className={styles.latestPostContainer}>
      <h1 className={styles.subTitle}>Latest Post</h1>
      <div className={styles.postRow} >
      {posts.map((post) => (
          <PostCard post={post} key={post._id} />
      ))}
      </div>
    </div>
    </>
  );
};

export default Home;
