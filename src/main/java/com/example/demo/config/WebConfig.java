package com.example.demo.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	/**
	 * ���� ȯ�濡���� ũ�ν� ������ �̽��� �ذ��ϱ� ���� �ڵ��
	 * � ȯ�濡 ������ ��쿡�� 15~18���� �ּ� ó���մϴ�.
	 * 
	 * ��ũ�ν� ������ �̽�: ���������� �ٸ� ���������� URL ��û�� �ϴ� ��� ��Ÿ���� ���ȹ���
	 */
	/*@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**").allowCredentials(true).allowedOrigins("http://localhost:3000");
	}
	*/
}