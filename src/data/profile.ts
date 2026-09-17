// 이름, 소개, 사진과 실제 링크를 여기서 수정하세요.
export const profile = {
  name: "김선정",
  handle: "sunjung",
  bio: "풀스택 개발자 | 요즘은 AI개발에 관심이 많아요",
  image: "/profile.jpg",
};

export const links = [
  { id: "github", title: "GitHub", description: "차곡차곡 쌓아가는 코드와 프로젝트", url: "http://github.com/gguldduck111", icon: "github" },
  { id: "blog", title: "Blog", description: "배운 것과 일상의 작은 발견들", url: "https://blog.naver.com/gguldduck111", icon: "book" },
  { id: "instagram", title: "Instagram", description: "조금 더 가까운 일상 이야기", url: "https://instagram.com/gguldduck", icon: "instagram" },
  { id: "email", title: "E-mail", description: "gguldduck111@gmail.com", url: "mailto:gguldduck111@gmail.com", icon: "mail" },
] as const;
