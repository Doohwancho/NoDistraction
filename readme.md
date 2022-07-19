# What is this app?
![pic1](https://github.com/Doohwancho/NoDistraction.js/blob/master/document/picture1.png)
![pic1](https://github.com/Doohwancho/NoDistraction.js/blob/master/document/picture2.png)

1. 커뮤니티 사이트에서 사진과 gif를 없앤다.
2. 커뮤니티 사이트를 흑백으로 바꾼다.


# why use it?

커뮤니티의 많은 글들은 조회수 & 추천 떄문에 자극적인 이미지를 사용한다.\
자극적인 이미지가 hook이 되어, 안 볼 글들을 더 보게되고,\
갑툭튀하는 헐벗은 여자사진 보고 정신 못차리게 된다.

사이트에서 사용하는 색들은 죄다 시뻘건데,\
빨간색이 다른 색상보다 더 집중을 뺏어가기 때문이다.


사용자를 중독자로 만드는 hook을 원천차단하는 앱.


어짜피 이미지가 없어도 양질의 글은 텍스트에서 충분히 얻어갈 수 있고,\
쉽게 toggle 가능하기 때문에, 사진을 봐야하는 경우, 잠시 껐다 켤 수 있다.


# why use this app over other app?

다른 image blocker 앱들 써봤는데,\
이미지를 block하는 시점이,\
사이트에 이미지가 다 로드된 뒤에 block하게 되있어서,\
이미지가 잠깐 보였다가 사라졌다.

헐벗은 여자 사진이 나타났다 갑자기 사라지는게\
오히려 더 감질나게 만들어서 안쓰느니만 못했다.

이 앱은 http request를 날리는 시점부터 image, media 관련 request를 원천 차단하기 때문에,\
이미지 받아서 잠깐 보인 후에 뒤늦게 지우는 방식이 아니다.


또한 다른 image blocking app들은\
.png, .jpeg같은 이미지 파일만 막지,\
gif나 iframe안에 딸려오는 mp4까지 막아주진 못했다.

흑백 기능도 없었다.



# How to install

1. git clone https://github.com/Doohwancho/NoDistraction.js
2. 크롬 확장 프로그램 추가

