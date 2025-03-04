import javax.swing.*;
import java.awt.*;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("PWA 실행기");
        frame.setSize(800, 600);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JEditorPane webView = new JEditorPane();
        webView.setEditable(false);
        try {
            webView.setPage("http://localhost:3000");
        } catch (Exception e) {
            webView.setText("PWA를 불러올 수 없습니다.");
        }

        frame.add(new JScrollPane(webView));
        frame.setVisible(true);
    }
}
