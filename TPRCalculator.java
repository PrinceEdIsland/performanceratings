import java.util.*;

public class TPRCalculator{
    public static void main(String[] args){
        double a;
        double b = 0;
        double c = 0;

        Scanner input = new Scanner(System.in);

        ArrayList<Double> playerRatings = new ArrayList<Double>();
        ArrayList<Double> gameScores = new ArrayList<Double>();

        double d = 1.0;
        double e;

        while(d != 0.0){
            System.out.println("Input rating: ");
            d = input.nextDouble();
            if(d != 0.0){
                playerRatings.add(d);
            }
            System.out.println("Input score: ");
            e=input.nextDouble();
            gameScores.add(e);
        }

        for(int x=0; x<=100000; x++){
            a=1;

            for(int i=0; i<playerRatings.size(); i++){
                if(gameScores.get(i)==1){
                    a*=Math.pow(1+Math.pow(10, (playerRatings.get(i)-Double.valueOf(x)/10)/400.0), -1);
                }
                if(gameScores.get(i)==0.5){
                    a*=Math.pow(1+Math.pow(10, (playerRatings.get(i)-Double.valueOf(x)/10)/400.0), -0.5);
                    a*=Math.pow(1+Math.pow(10, (Double.valueOf(x)/10-playerRatings.get(i))/400.0), -0.5);
                }
                if(gameScores.get(i)==0){
                    a*=Math.pow(1+Math.pow(10, (Double.valueOf(x)/10-playerRatings.get(i))/400.0), -1);
                }
            }

            if(a>b){
                b=a;
                c=x;
            }
        }

        System.out.println(c/10);
    }
}