package ${application.corePackage}.rs.exception;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import ${application.corePackage}.json.JsonError;

public class SimpleErrorMessageHandlerExceptionResolver extends AbstractHandlerExceptionResolver {

	private static final int DEFAULT_ORDER = 0;

	public SimpleErrorMessageHandlerExceptionResolver() {
		setOrder(DEFAULT_ORDER);
	}

	@Override
	protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
		try {
			return handleIllegalArgument(ex, request, response, handler);
		} catch (Exception handlerException) {
			logger.warn("Handling of [" + ex.getClass().getName() + "]    resulted in Exception", handlerException);
		}
		return null;
	}

	private ModelAndView handleIllegalArgument(Exception ex, HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView(), "error", new JsonError(ex, ex.getMessage(), null));
		modelAndView.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
		return modelAndView;
	}

}