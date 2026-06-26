// ============ DATA AWAL ============
const defaultUsers = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@demo.com",
    password: "123456",
    avatar: "https://ui-avatars.com/api/?name=Demo+User&background=8B5CF6&color=fff",
    createdAt: new Date().toISOString()
  }
];

const defaultActivities = [
  {
    id: "1",
    title: "Pantai Padang - Sunset View",
    category: "Wisata Alam",
    mood: "Relaxing",
    duration: "2-3 jam",
    price: "Rp 15.000",
    location: "Pantai Padang, Padang",
    city: "Padang",
    image: "https://www.nopostcode.com/wp-content/uploads/2022/08/Padang-Padang-Uluwatu-8-1280x853.jpg",
    description: "Nikmati keindahan sunset di Pantai Padang dengan ombak yang tenang."
  },
  {
    id: "2",
    title: "Jam Gadang - Ikon Bukittinggi",
    category: "Wisata Budaya",
    mood: "Artistic",
    duration: "1-2 jam",
    price: "Gratis",
    location: "Bukittinggi",
    city: "Bukittinggi",
    image: "https://tse4.mm.bing.net/th/id/OIP.73eH-_6Et7ixTzvenx1k4gHaFj?pid=Api&h=220&P=0",
    description: "Kunjungi ikon kota Bukittinggi, Jam Gadang yang megah."
  },
  {
    id: "3",
    title: "Ngarai Sianok - Green Canyon",
    category: "Wisata Alam",
    mood: "Adventurous",
    duration: "3-4 jam",
    price: "Rp 25.000",
    location: "Ngarai Sianok, Bukittinggi",
    city: "Bukittinggi",
    image: "https://harmoniwisata.com/wp-content/uploads/2025/11/Harmoni-Wisata-Ngarai-Sianok-2.jpg",
    description: "Jelajahi keindahan Ngarai Sianok dengan pemandangan hijau yang memukau."
  },
  {
    id: "4",
    title: "Danau Maninjau - Panorama",
    category: "Wisata Alam",
    mood: "Calming",
    duration: "4-5 jam",
    price: "Rp 20.000",
    location: "Danau Maninjau, Agam",
    city: "Kabupaten Agam",
    image: "https://static.vecteezy.com/system/resources/previews/023/669/714/non_2x/aerial-view-of-panorama-of-maninjau-lake-west-sumatra-danau-maninjau-sumatra-indonesia-january-24-2023-photo.JPG",
    description: "Nikmati keindahan Danau Maninjau dengan pemandangan gunung berapi."
  },
  {
    id: "5",
    title: "Istana Baso Pagaruyuang - Museum Adat",
    category: "Wisata Budaya",
    mood: "Artistic",
    duration: "1-2 jam",
    price: "Rp 10.000",
    location: "Batusangkar",
    city: "Batusangkar",
    image: "https://tse1.mm.bing.net/th/id/OIP.wGTVAjNWXwwcIn3cynx1_AHaE8?pid=Api&h=220&P=0",
    description: "Lihat arsitektur khas Minangkabau di Rumah Gadang yang bersejarah."
  },
  {
    id: "6",
    title: "Sate Padang - Kuliner Legendaris",
    category: "Kuliner",
    mood: "Energetic",
    duration: "1 jam",
    price: "Rp 35.000",
    location: "Padang",
    city: "Padang",
    image: "https://tse2.mm.bing.net/th/id/OIP.0qQDxFivZt4LJ6pDLoUhNQHaE9?pid=Api&h=220&P=0",
    description: "Cicipi sate Padang yang terkenal dengan kuahnya yang kental."
  },
  {
    id: "7",
    title: "Lamun Ombak- Masakan Khas Minang",
    category: "Kuliner",
    mood: "Relaxing",
    duration: "1-2 jam",
    price: "Rp 40.000",
    location: "Padang",
    city: "Padang",
    image: "https://tse1.mm.bing.net/th/id/OIP.oS52oXWOc-4_JxxPBAD8sgHaEv?pid=Api&h=220&P=0",
    description: "Nikmati cita rasa asli masakan Minang yang sudah mendunia."
  },
  {
    id: "8",
    title: "Puncak Lawang - Kabupaten Agam",
    category: "Wisata Alam",
    mood: "Adventurous",
    duration: "2-3 jam",
    price: "Rp 15.000",
    location: "Puncak Lawang, Kabupaten Agam",
    city: "Kabupaten Agam",
    image: "https://rentalmobilpadang.co.id/wp-content/uploads/2019/04/Jangan-Hanya-Fokus-Ke-Danau-Maninjau-Saja-Coba-Lirik-Juga-Puncak-Lawang-1.jpg",
    description: "Lihat panorama indah dari ketinggian Puncak Lawang."
  },
  {
    id: "9",
    title: "Pantai Gandoriah - Pariaman",
    category: "Wisata Alam",
    mood: "Relaxing",
    duration: "2-3 jam",
    price: "Rp 20.000 - Rp 30.000",
    location: "Pariaman",
    city: "Pariaman",
    image: "https://tse4.mm.bing.net/th/id/OIP.L1nKfq3_If0jaei5LoTasQHaDb?pid=Api&h=220&P=0",
    description: "Nikmati suasana nelayan di pantai Pariaman yang asri."
  },
  {
    id: "10",
    title: "Gua Jepang - Sejarah",
    category: "Wisata Budaya",
    mood: "Artistic",
    duration: "1-2 jam",
    price: "Rp 10.000 - Rp 20.000",
    location: "Bukittinggi",
    city: "Bukittinggi",
    image: "https://tse4.mm.bing.net/th/id/OIP.X9loh-lmTm4e6fHMUqQgLQHaEK?pid=Api&h=220&P=0",
    description: "Jelajahi Gua Jepang peninggalan sejarah di Bukittinggi."
  },
  {
    id: "11",
    title: "Taman Margasatwa - Kinantan",
    category: "Wisata Alam",
    mood: "Fun",
    duration: "2-3 jam",
    price: "Rp 30.000 - Rp 40.000",
    location: "Bukittinggi",
    city: "Bukittinggi",
    image: "https://i.ytimg.com/vi/99saT-2oU9M/maxresdefault.jpg",
    description: "Lihat berbagai satwa di Taman Margasatwa Kinantan."
  },
  {
    id: "12",
    title: "Goa Kelelawar - Padang",
    category: "Wisata Alam",
    mood: "Adventurous",
    duration: "2-3 jam",
    price: "Rp 10.000",
    location: "Padang",
    city: "Padang",
    image: "https://tse2.mm.bing.net/th/id/OIP.hwV2QzsDaQ66Jammf1p0ZAHaGa?pid=Api&h=220&P=0",
    description: "Trekking seru di Bukit Ambacang dengan pemandangan Padang."
  },
  {
    id: "13",
    title: "Kuliner Nasi Kapau",
    category: "Kuliner",
    mood: "Energetic",
    duration: "1 jam",
    price: "Rp 35.000 - Rp 50.000",
    location: "Bukittinggi",
    city: "Bukittinggi",
    image: "https://tse1.mm.bing.net/th/id/OIP.7w50p8oDsSdK06VXxzzr0QHaE8?pid=Api&h=220&P=0",
    description: "Cicipi Nasi Kapau dengan lauk pauk khas Minang."
  },
  {
    id: "14",
    title: "Danau Singkarak - Wisata Air",
    category: "Wisata Alam",
    mood: "Calming",
    duration: "3-4 jam",
    price: "Rp 15.000",
    location: "Solok",
    city: "Solok",
    image: "https://tse3.mm.bing.net/th/id/OIP.wC4AYgM4wxdutbD30i6I6gHaEV?pid=Api&h=220&P=0",
    description: "Nikmati keindahan Danau Singkarak yang luas dan tenang."
  },
  {
    id: "15",
    title: "Lembah Harau - Green Valley",
    category: "Wisata Alam",
    mood: "Adventurous",
    duration: "3-4 jam",
    price: "Rp 10.000 - Rp 20.000",
    location: "Payakumbuh",
    city: "Payakumbuh",
    image: "https://tse3.mm.bing.net/th/id/OIP.9cbYPoqLg2q-hRvGcfKOpQHaE-?pid=Api&h=220&P=0",
    description: "Jelajahi Lembah Harau dengan tebing-tebing hijau yang indah."
  },
  {
    id: "16",
    title: "Pantai Carocok - Painan",
    category: "Wisata Alam",
    mood: "Relaxing",
    duration: "2-3 jam",
    price: "Rp 10.000 - Rp 20.000",
    location: "Painan, Pesisir Selatan",
    city: "Painan",
    image: "https://salsawisata.com/wp-content/uploads/2023/02/Pantai-Carocok-Painan-drone-view.jpg",
    description: "Nikmati pantai Carocok dengan pasir putih dan ombak tenang."
  },
  {
    id: "17",
    title: "Festival Pacu Jawi",
    category: "Wisata Budaya",
    mood: "Energetic",
    duration: "3-4 jam",
    price: "Gratis",
    location: "Tanah Datar",
    city: "Batusangkar",
    image: "https://tse2.mm.bing.net/th/id/OIP.h5tmYQ74-8tq8JUKAWBVYgHaE8?pid=Api&h=220&P=0",
    description: "Saksikan tradisi Pacu Jawi yang spektakuler di Tanah Datar."
  },
  {
    id: "18",
    title: "Museum Adityawarman",
    category: "Wisata Budaya",
    mood: "Artistic",
    duration: "1-2 jam",
    price: "Rp 5.000 - Rp 10.000",
    location: "Padang",
    city: "Padang",
    image: "https://tse3.mm.bing.net/th/id/OIP.66UtABdoFZEt56US6wfK3QHaEc?pid=Api&h=220&P=0",
    description: "Lihat koleksi sejarah dan budaya Minangkabau di Museum Adityawarman."
  },
  {
    id: "19",
    title: "Air Terjun Lembah Anai",
    category: "Wisata Alam",
    mood: "Relaxing",
    duration: "1-2 jam",
    price: "Rp 10.000",
    location: "Kabupaten Tanah Datar",
    city: "Kabupaten Tanah Datar",
    image: "https://tse2.mm.bing.net/th/id/OIP.vL4kd3DWBLCClq4l2i3X3AHaEK?pid=Api&h=220&P=0",
    description: "Nikmati kesegaran Air Terjun Lembah Anai yang indah."
  },
  {
    id: "20",
    title: "Puncak marajo - Payakumbuh",
    category: "Wisata Alam",
    mood: "Adventurous",
    duration: "2-3 jam",
    price: "Rp 10.000 - Rp 20.000",
    location: "Payakumbuh",
    city: "Payakumbuh",
    image: "https://image.idntimes.com/post/20250311/puncak-marajo-5ffbb7f9a1f93b27536f93e505ba04c4.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75",
    description: "Pendakian ringan di Bukit Apit dengan view kota Payakumbuh."
  },
  {
    id: "21",
    title: "Pendakian Gunung Singgalang",
    category: "Olahraga",
    mood: "Adventurous",
    duration: "8-10 jam",
    price: "Gratis",
    location: "Kabupaten Agam",
    city: "Kabupaten Agam",
    image: "https://assets-a1.kompasiana.com/items/album/2021/08/23/singgalang-pagi-hari-cover-61230b4b31a28717c8683312.jpg",
    description: "Trekking ekstrik ke puncak Gunung Singgalang dengan view spektakuler."
  },
  {
    id: "22",
    title: "Arung Jeram Sungai Anai",
    category: "Olahraga",
    mood: "Energetic",
    duration: "3-4 jam",
    price: "Rp 150.000 - Rp 200.000",
    location: "Kabupaten Tanah Datar",
    city: "Kabupaten Tanah Datar",
    image: "https://tse4.mm.bing.net/th/id/OIP.um1HUzetCXfxJ01H5WFuCAHaEo?pid=Api&h=220&P=0",
    description: "Rasakan sensasi arung jeram di Sungai Anai yang menantang."
  },
  {
    id: "23",
    title: "Sepeda Gunung di Lembah Harau",
    category: "Olahraga",
    mood: "Energetic",
    duration: "3-4 jam",
    price: "Rp 50.000 - Rp 100.000",
    location: "Payakumbuh",
    city: "Payakumbuh",
    image: "https://img.antarafoto.com/cache/1200x764/2020/11/07/lembah-harau-menuju-geopark-nasional-rp88-dom.jpg",
    description: "Jelajahi Lembah Harau dengan sepeda gunung menyusuri jalur hijau."
  },
  {
    id: "24",
    title: "Wisata Danau kembar- Solok",
    category: "Wisata Alam",
    mood: "Calming",
    duration: "3-4 jam",
    price: "Rp 5.000 - Rp 15.000",
    location: "Solok",
    city: "Solok",
    image: "https://tse4.mm.bing.net/th/id/OIP.R77hrEU8-9PuKcgB5DlyggHaEU?pid=Api&h=220&P=0",
    description: "Nikmati keindahan Danau Diatas yang sejuk di Solok."
  },
  {
    id: "25",
    title: "Istano Silinduang Bulan",
    category: "Wisata Budaya",
    mood: "Artistic",
    duration: "1-2 jam",
    price: "Rp 10.000 - Rp 20.000",
    location: "Payakumbuh",
    city: "Payakumbuh",
    image: "https://aktamedia.com/wp-content/uploads/2025/04/IMG_20250419_155708.jpg",
    description: "Kunjungi rumah adat gadang di Istano Silinduang Bulan."
  },
  {
    id: "26",
    title: "Pasar Kuliner Padang Panjang",
    category: "Kuliner",
    mood: "Energetic",
    duration: "1-2 jam",
    price: "Gratis",
    location: "Padang Panjang",
    city: "Padang Panjang",
    image: "https://tse4.mm.bing.net/th/id/OIP.BLvbbtlbi__A2N4YX9ZdUwHaFj?pid=Api&h=220&P=0",
    description: "Jelajahi pasar kuliner Padang Panjang dengan berbagai makanan khas Minang."
  },
  {
    id: "27",
    title: "Pasar Los Lambuang - Wisata Belanja Khas Bukittinggi",
    category: "Kuliner",
    mood: "Energetic",
    duration: "2-3 jam",
    price: "Gratis",
    location: "Pasar Los Lambuang, Bukittinggi",
    city: "Bukittinggi",
    image: "https://warnasulsel.com/wp-content/uploads/2024/05/Los-Lambuang.jpg",
    description: "Jelajahi Pasar Los Lambuang, pasar tradisional khas Bukittinggi dengan berbagai oleh-oleh dan makanan khas Minang."
  }
];

// ============ LOCAL STORAGE HELPERS ============
export const getUsers = () => {
  const data = localStorage.getItem('hangouthub_users');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      localStorage.setItem('hangouthub_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
  }
  localStorage.setItem('hangouthub_users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

export const saveUsers = (users) => {
  localStorage.setItem('hangouthub_users', JSON.stringify(users));
};

export const getActivities = () => {
  const data = localStorage.getItem('hangouthub_activities');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      localStorage.setItem('hangouthub_activities', JSON.stringify(defaultActivities));
      return defaultActivities;
    }
  }
  localStorage.setItem('hangouthub_activities', JSON.stringify(defaultActivities));
  return defaultActivities;
};

export const getPlans = () => {
  const data = localStorage.getItem('hangouthub_plans');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      localStorage.setItem('hangouthub_plans', JSON.stringify([]));
      return [];
    }
  }
  localStorage.setItem('hangouthub_plans', JSON.stringify([]));
  return [];
};

export const savePlans = (plans) => {
  localStorage.setItem('hangouthub_plans', JSON.stringify(plans));
};

export const getCurrentUser = () => {
  const data = localStorage.getItem('hangouthub_current_user');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem('hangouthub_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('hangouthub_current_user');
  }
};