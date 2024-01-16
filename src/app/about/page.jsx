import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};


const AboutPage = () => {

  // console.log("lets check where it works")
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Us</h2>
        <h1 className={styles.title}>
           <span>Bigger Ideas</span>
           <span>Bolder Execution</span>
        </h1>
        <p className={styles.desc}>

        Welcome to <span className={styles.subtitle}>Trendzipper</span>, where we don&apos;t just market brands; we craft 
        compelling narratives that resonate, captivate, and leave a lasting impression. 
        Our team of innovative minds understands that each brand has a unique story waiting 
        to be told, and we&apos;re here to bring it to life.

        At <span className={styles.subtitle}>Trendzipper</span>, we go beyond traditional marketing approaches. 
        We believe in creating immersive experiences that engage audiences on a deep, emotional 
        level. From strategic brand positioning to visually stunning campaigns, we tailor our approach to 
        showcase the essence of your brand in a way that stands out in the crowded marketplace.
        
        Our comprehensive suite of services includes market research, brand strategy, creative design, 
        digital marketing, and experiential campaigns. We leverage the latest trends and technologies to 
        ensure your brand remains at the forefront of industry conversations.
        
        Collaboration is at the heart of what we do. We work closely with our clients, understanding 
        their vision, values, and goals to create a cohesive brand identity that resonates with their 
        target audience. Let <span className={styles.subtitle}>Trendzipper</span> be the catalyst for your brand&apos;s success – where 
        creativity meets strategy, and ideas turn into unforgettable brand stories.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>2+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>100 +</h1>
            <p>Jobs completed</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/about.png"
          alt="About Image"
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default AboutPage;
