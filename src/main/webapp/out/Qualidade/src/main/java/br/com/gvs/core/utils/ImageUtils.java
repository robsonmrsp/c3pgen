package br.com.gvs.core.utils;

import static org.imgscalr.Scalr.resize;


import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.imageio.stream.FileImageInputStream;

import org.apache.log4j.Logger;
import org.imgscalr.Scalr.Method;

public class ImageUtils {

	private static final int FULL_HD_WIDTH = 1920;
	private static final int HD_WIDTH = 1080;
	private static final Logger LOGGER = Logger.getLogger(ImageUtils.class);
	private static final Map<String, String> FORMATS = new HashMap<String, String>();
	static {
		FORMATS.put("image/jpeg", "jpeg");
		FORMATS.put("image/JPEG", "png");
		FORMATS.put("image/jpg", "jpeg");
		FORMATS.put("image/JPG", "png");
		FORMATS.put("image/PNG", "png");
		FORMATS.put("image/png", "png");
	}

	public static void main(String[] args) {
		// try {
		// BufferedImage read = ImageIO.read(new
		// File("C:\\Users\\robson\\Pictures\\DSC07658.JPG"));
		// BufferedImage createThumbnail = createThumbnail(read);
		// ImageIO.write(createThumbnail, "JPG", new
		// File("C:\\Users\\robson\\Pictures\\DSC07658_125_ultra.JPG"));
		// } catch (IOException e) {
		// LOGGER.error(e);
		// }
	}

	private static BufferedImage createThumbnail(String imagePath, int width) {
		BufferedImage image = null;
		try {
			image = ImageIO.read(new FileImageInputStream(new File(imagePath)));
			image = resize(image, Method.BALANCED, width);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return image;
	}

	private static BufferedImage createThumbnail(BufferedImage img, int width) {
		img = resize(img, Method.BALANCED, width);
		return img;
	}

	// Manterá o nome do arquivo
	public static void createThumbnail(BufferedImage stream, int thumbnailWidth, String contentType, String folder, String fileName) throws IOException {

		createImage(stream, thumbnailWidth, contentType, folder, fileName);
	}

	public static void createThumbnail(String stream, int thumbnailWidth, String contentType, String folder, String fileName) throws IOException {

		createImage(stream, thumbnailWidth, contentType, folder, fileName);
	}

	public static void createImage(String imagePath, int thumbnailWidth, String contentType, String folder, String fileName) throws IOException {

		BufferedImage createThumbnail = createThumbnail(imagePath, thumbnailWidth);
		boolean write = ImageIO.write(createThumbnail, FORMATS.get(contentType), new File(folder + fileName));
		System.out.println("ImageUtils.saveImage()" + write);
	}

	private static void createImage(BufferedImage stream, int thumbnailWidth, String contentType, String folder, String fileName) throws IOException {
		BufferedImage createThumbnail = createThumbnail(stream, thumbnailWidth);
		boolean write = ImageIO.write(createThumbnail, FORMATS.get(contentType), new File(folder + fileName));
		System.out.println("ImageUtils.saveImage()" + write);
	}

	public static void createFullHdImage(BufferedImage stream, String contentType, String folder, String fileName) throws IOException {
		createImage(stream, FULL_HD_WIDTH, contentType, folder, "FULL_HD_" + fileName);
	}

	public static void createHdImage(BufferedImage stream, String contentType, String folder, String fileName) throws IOException {
		createImage(stream, HD_WIDTH, contentType, folder, "HD_" + fileName);
	}

	public static void saveImage(BufferedImage stream, String contentType, String folder, String fileName) throws IOException {

		BufferedImage createThumbnail = createThumbnail(stream, stream.getWidth());
		boolean write = ImageIO.write(createThumbnail, FORMATS.get(contentType), new File(folder + "ORIGINAL_" + fileName));
		System.out.println("ImageUtils.saveImage()" + write);
	}
}
