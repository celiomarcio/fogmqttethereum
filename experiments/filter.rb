#!/usr/bin/ruby

# ARGS file,time(m),nodes,miners 
#ruby filter.rb 5min5Node2Miners.log 5 5 2

# Data example
#2022-22-5-15:21:28: Tx init

require 'date'

buff = []
successtransactions = []
erro = 0
success = 0
tx=0
File.open(ARGV[0]).each_line do |line|
    m = line.match(/^(\d{4})-(\d{1,2})-(\d{1,2})-(\d{1,2}):(\d{1,2})\:(\d{1,2}): Tx (init|success|erro)$/)
    if m
        case m[7] 
            when "init"
                dateinit = (m[4].to_i * 3600) + (m[5].to_i*60) + m[6].to_i
                #p buff
                #p "init em :" +  dateinit.to_s
                buff << dateinit 
            when "erro"
                #p buff
                #p "erro"
                erro = erro + 1
                #p "removendo init que gerou erro"
                buff.pop()
                tx = tx +1
            when  "success"
                sucesstime = (m[4].to_i * 3600) + (m[5].to_i*60) + m[6].to_i
                #p "sucess time em :" + sucesstime.to_s
                #p buff
                transtime = sucesstime - buff.first
                #p "tempo de transacao :" + transtime.to_s
                success = success + 1
                buff.delete_at(0)
                #p buff
                successtransactions << transtime
                tx = tx +1
        end
 
    end
end

media = 0 
successtransactions.each do |t|
    media = media +  t  
end
media = ((media / success).to_f).ceil
#p successtransactions
#p "numNodes, numMiners, Tx/min, TxError/min, TxSuccess/min, mediaTimeTx" 

p ARGV[2].to_s + "," + ARGV[3].to_s + "," + ((tx/ARGV[1].to_f).ceil).to_s + "," + ((erro/ARGV[1].to_f).ceil).to_s + "," + ((success/ARGV[1].to_f).ceil).to_s + "," + media.to_s
 