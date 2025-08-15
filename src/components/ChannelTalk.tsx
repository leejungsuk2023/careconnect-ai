import { useEffect } from 'react';

const ChannelTalk = () => {
  useEffect(() => {
    const ChannelIO = (function() {
      const ch: any = function() {
        ch.c(arguments);
      };
      ch.q = [] as any[];
      ch.c = function(args: any) {
        ch.q.push(args);
      };
      (window as any).ChannelIO = ch;
      return ch;
    })();

    const loadScript = function() {
      if ((window as any).ChannelIOInitialized) {
        return;
      }
      (window as any).ChannelIOInitialized = true;
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      const x = document.getElementsByTagName('script')[0];
      if (x.parentNode) {
        x.parentNode.insertBefore(s, x);
      }
    };

    if (document.readyState === 'complete') {
      loadScript();
    } else {
      window.addEventListener('DOMContentLoaded', loadScript);
      window.addEventListener('load', loadScript);
    }

    // Boot Channel Talk with your plugin key
    ChannelIO('boot', {
      pluginKey: 'ac1cd793-222d-4538-ac20-8ae1e9d313d0',
      customLauncherSelector: '.channel-talk-launcher',
      hideChannelButtonOnBoot: false,
      // 추가 설정 옵션들
      language: 'ko', // 한국어 설정
      appearance: 'dark', // 다크 모드
      zIndex: 9999,
      // 사용자 정보를 추가하려면 아래 주석 해제
      // profile: {
      //   name: '사용자 이름',
      //   email: 'user@example.com',
      //   mobileNumber: '010-1234-5678',
      // },
      // 커스텀 데이터
      customAttributes: {
        source: 'careconnect-ai-website',
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
      // 메신저 설정
      messengerTitle: 'CareConnect AI 상담',
      introMessage: '안녕하세요! 👋\nCareConnect AI 도입 상담을 도와드리겠습니다.\n\n어떤 도움이 필요하신가요?',
      // 팀 응답 시간 표시
      expectedResponseTime: 'average',
    });

    // Cleanup
    return () => {
      if ((window as any).ChannelIO) {
        (window as any).ChannelIO('shutdown');
      }
    };
  }, []);

  return null;
};

export default ChannelTalk;