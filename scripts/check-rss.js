#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// RSS 체크 함수
async function checkRSSForUpdates() {
  try {
    console.log('🔍 Checking Naver RSS for updates...');
    
    // 현재 저장된 마지막 글 ID 확인
    const lastPostFile = path.join(__dirname, '../.last-post-id');
    let lastPostId = null;
    
    if (fs.existsSync(lastPostFile)) {
      lastPostId = fs.readFileSync(lastPostFile, 'utf8').trim();
    }
    
    // RSS에서 최신 글 가져오기
    const response = await fetch('https://rss.blog.naver.com/meditravelconnect.xml');
    const xml = await response.text();
    
    // 간단한 파싱 (실제로는 더 정교한 파싱 필요)
    const latestPostMatch = xml.match(/<link>https:\/\/blog\.naver\.com\/meditravelconnect\/(\d+)<\/link>/);
    
    if (latestPostMatch) {
      const latestPostId = latestPostMatch[1];
      
      if (lastPostId !== latestPostId) {
        console.log(`📝 New post found: ${latestPostId}`);
        
        // 새 글 ID 저장
        fs.writeFileSync(lastPostFile, latestPostId);
        
        // 새 글이 있음을 표시
        process.exit(0); // 성공 (새 글 있음)
      } else {
        console.log('ℹ️ No new posts found');
        process.exit(1); // 실패 (새 글 없음)
      }
    } else {
      console.log('⚠️ Could not parse RSS');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error checking RSS:', error);
    process.exit(1);
  }
}

// 스크립트 실행
checkRSSForUpdates();
