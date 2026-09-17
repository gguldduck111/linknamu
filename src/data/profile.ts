// 이름, 소개, 사진과 실제 링크를 여기서 수정하세요.
export const profile = {
  name: "김선정",
  handle: "seonjeong",
  bio: "공부하고, 만들고, 기록하는 중 🌱",
  image: "/avatar.svg",
};

export const links = [
  { id: "github", title: "GitHub", description: "차곡차곡 쌓아가는 코드와 프로젝트", url: "https://github.com", icon: "github" },
  { id: "blog", title: "나의 블로그", description: "배운 것과 일상의 작은 발견들", url: "https://velog.io", icon: "book" },
  { id: "instagram", title: "Instagram", description: "조금 더 가까운 일상 이야기", url: "https://www.instagram.com", icon: "instagram" },
] as const;
