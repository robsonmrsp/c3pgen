package ${application.rootPackage}.restclientes;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.apache.commons.codec.binary.Base64;

public class TokenUtils {

	public static String getUserNameFromToken(List list) {
		String username = null;
		String authorization = "";
		if ((list != null && list.size() > 0)) {
			authorization = (String) list.get(0);
		}

		try {

			if (authorization != null && authorization.startsWith("Basic")) {
				// Authorization: Basic base64credentials
				String base64Credentials = authorization.substring(6).trim();
				String credentials;
				credentials = new String(Base64.decodeBase64(base64Credentials.getBytes("UTF-8")));
				// credentials = username:password
				final String[] values = credentials.split(":", 2);
				username = values[0];
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return username;
	}

	public static String getPassNameFromToken(List list) {
		// TODO Auto-generated method stub
		return null;
	}

}
