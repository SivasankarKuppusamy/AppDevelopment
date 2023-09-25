const CourseData = [
    {
      id: 1,
      title: 'React Fundamentals',
      imageSrc: 'https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1279225/retina_1708x683_0521-react-redux-and-immutablejs-Waldek_Newsletter-993b50f4ae56e9ee6e024a309c23a6c4.png',
      description: 'Learn the fundamental concepts of React, including components, props, and state management.',
    },
    {
      id: 2,
      title: 'JavaScript for Beginners',
      imageSrc: 'https://miro.medium.com/v2/resize:fit:1024/1*YQgaKfVzK-YpxyT3NYqJAg.png',
      description: 'Start your programming journey with this beginner-friendly JavaScript course covering syntax, variables, and functions.',
    },
    {
      id: 3,
      title: 'Python Programming Mastery',
      imageSrc: 'https://img-b.udemycdn.com/course/750x422/2023204_d2af_12.jpg',
      description: 'Master Python programming with hands-on exercises and real-world projects.',
    },
    {
      id: 4,
      title: 'Data Science Essentials',
      imageSrc: 'https://learning.itexperttraining.com/uploads/thumbnails/course_thumbnails/course_thumbnail_default_134.jpg',
      description: 'Dive into data science with courses on statistics, machine learning, and data analysis tools.',
    },
    {
      id: 5,
      title: 'Web Development Bootcamp',
      imageSrc: 'https://miro.medium.com/v2/resize:fit:1400/0*2WskF-iTBOvp_cQp',
      description: 'Get a comprehensive introduction to web development, covering HTML, CSS, and JavaScript.',
    },
    {
      id: 6,
      title: 'AWS Certified Solutions Architect',
      imageSrc: 'https://miro.medium.com/v2/resize:fit:1024/1*b8X599aUEKzApDxl37BuYw.jpeg',
      description: 'Prepare for the AWS Certified Solutions Architect exam and learn how to design scalable and reliable cloud solutions.',
    },
  ];
  
  export const getCourseData = () => {
    const storedData = localStorage.getItem('courseData');
    return storedData ? JSON.parse(storedData) : [];
  };
  
  export const setCourseData = (data) => {
    localStorage.setItem('courseData', JSON.stringify(data));
  };
  