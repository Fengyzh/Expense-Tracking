package com.SW.Project_fin.utils;

import org.springframework.ai.ollama.api.OllamaApi;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ResponseTrim {

    public String extractSQL(String msg) {
        // Extracting text inside "```"
        Pattern pattern = Pattern.compile("```([^`]*)```");
        Matcher matcher = pattern.matcher(msg);

        if (matcher.find()) {
            String extractedText = matcher.group(1).replaceAll("\\n", " ");
            extractedText = extractedText.replace("sql", "");
            System.out.println(extractedText);
            return extractedText;
        } else {
            System.out.println("No match found. " + msg );
            return msg;
        }

    }

}
