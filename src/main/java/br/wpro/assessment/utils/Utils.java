package br.wpro.assessment.utils;

import lombok.extern.slf4j.Slf4j;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Slf4j
public class Utils {

    private static final String HASH = "82364629WPRO92384PEOLPE9384FHKLHARF3984";

    public static String hashPassword(String passwd) {
        if(passwd == null || passwd.isEmpty()){
            passwd = "123456";
        }
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(passwd.getBytes());
            byte[] digest = md.digest();
            String myHash = DatatypeConverter.printHexBinary(digest).toUpperCase();
            return myHash;

        } catch (Exception e) {
            log.warn("Error to hash Password", e);
        }
        return passwd;
    }

}
