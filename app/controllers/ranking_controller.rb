
  class RankingController < ApplicationController
  def ranking
    @limit = params[:limit]
    @newScore= params[:score].to_i
    @id =  session[:user_id]
    if !Score.find_by(score: @newScore, users_id: @id, limit: @limit)
    a = Score.new(score: @newScore, users_id: @id, limit: @limit)
    a.save
end
    
    
   case @limit
     when "30" then
         maxScores = MaxScore30
     when "60" then
         maxScores =MaxScore60
     when "90" then
         maxScores = MaxScore90
   end
        
 maxScore= Score.where(users_id: @id, limit: @limit).maximum(:score)
  
 if maxScore
    if maxScores.find_by(users_id: @id)
        if @newScore > maxScores.find_by(users_id: @id).score
            @text = "ベストスコアを更新しました！"
         x =  maxScores.find_by(users_id: @id)
         x.score = maxScore
         x.save
            
           @myScore =@newScore 
         
        else
            @text = "ベストスコアに届きませんでした"
            @myScore = maxScores.find_by(users_id: @id).score
        end
   else
    a = maxScores.new(score: maxScore, users_id: @id)
     a.save
      @myScore =@newScore 
   end
 
 end
  
    @results = maxScores.all.order(score: "DESC")
  end
  
  def ranking_all
     @results30 = MaxScore30.all.order(score: "DESC")
     @results60 = MaxScore60.all.order(score: "DESC")
     @results90 = MaxScore90.all.order(score: "DESC")
  end
  
end