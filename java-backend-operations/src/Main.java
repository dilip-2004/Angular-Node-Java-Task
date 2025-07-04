import java.io.BufferedReader;
import java.io.InputStreamReader;
import com.google.gson.*;

public class Main {
  public static void main(String[] args) throws Exception {
    Gson gson = new Gson();
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    String line;
    while ((line = br.readLine()) != null) {
      JsonObject req = gson.fromJson(line, JsonObject.class);
      double a = req.get("a").getAsDouble();
      double b = req.get("b").getAsDouble();
      String op = req.get("op").getAsString();
      double res = switch (op) {
        case "add" -> a + b;
        case "sub" -> a - b;
        case "mul" -> a * b;
        case "div" -> a / b;
        default -> Double.NaN;
      };
      
      JsonObject resp = new JsonObject();
      resp.addProperty("result", res);
      System.out.println(gson.toJson(resp));
      System.out.flush();
    }
  }
}