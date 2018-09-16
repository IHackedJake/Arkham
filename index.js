const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ms = require("ms");
const config = require("./config.json");
const Enmap = require("enmap");
client.hist = new Enmap({name: "hist"});
client.warns = new Enmap({name: "warns"});
client.toggle = new Enmap({name: "toggle"});
client.poll = new Enmap({name: "poll"});
client.suggest = new Enmap({name: "suggest"});
client.child = new Enmap({name: "child"});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("ready", async () => {
  console.log("bot's on");
});

client.on("message", async message => {
  if (message.author.bot) return;

  let blockedWords = [
    '(nigger)', '(nigger)ia', '(nigger)ia?', '-nigger', '-niggers', '.nigger', '4g!n', '4g1n', '4gg!n', '4gg1n', '4ggin', '4ggln', '4gin', '4gln', '4gp!n', '4gp1n', '4gpin', '4gpln', '4gq!n', '4gq1n', '4gqin', '4gqln', '4p!n', '4p1n', '4pg!n', '4pg1n', '4pgin', '4pgln', '4pin', '4pln', '4pp!n', '4pp1n', '4ppin', '4ppln', '4pq!n', '4pq1n', '4pqin', '4pqln', '4q!n', '4q1n', '4qg!n', '4qg1n', '4qgin', '4qgln', '4qin', '4qln', '4qp!n', '4qp1n', '4qpin', '4qpln', '4qq!n', '4qq1n', '4qqin', '4qqln', '?nigger', '?niggers', '@g!n', '@g1n', '@gg!n', '@gg1n', '@ggin', '@ggln', '@gin', '@gln', '@gp!n', '@gp1n', '@gpin', '@gpln', '@gq!n', '@gq1n', '@gqin', '@gqln', '@p!n', '@p1n', '@pg!n', '@pg1n', '@pgin', '@pgln', '@pin', '@pln', '@pp!n', '@pp1n', '@ppin', '@ppln', '@pq!n', '@pq1n', '@pqin', '@pqln', '@q!n', '@q1n', '@qg!n', '@qg1n', '@qgin', '@qgln', '@qin', '@qln', '@qp!n', '@qp1n', '@qpin', '@qpln', '@qq!n', '@qq1n', '@qqin', '@qqln', 'ag!n', 'ag1n', 'agg!n', 'agg1n', 'aggin', 'aggln', 'agln', 'agp!n', 'agp1n', 'agpin', 'agpln', 'agq!n', 'agq1n', 'agqin', 'agqln', 'ap!n', 'ap1n', 'apg!n', 'apg1n', 'apgin', 'apgln', 'apin', 'apln', 'app!n', 'app1n', 'appin', 'appln', 'apq!n', 'apq1n', 'apqin', 'apqln', 'aq!n', 'aq1n', 'aqg!n', 'aqg1n', 'aqgin', 'aqgln', 'aqin', 'aqln', 'aqp!n', 'aqp1n', 'aqpin', 'aqpln', 'aqq!n', 'aqq1n', 'aqqin', 'aqqln', 'beaner', 'beaners', 'ch1gg3r', 'ch1gga', 'ch1gger', 'chigga', 'chink', 'chinks', 'coon', 'coons', 'fatnibba', 'fatnigga', 'fatnigger', 'kike', 'kikes', 'legendmc', 'n!!gga', 'n!554', 'n!5545', 'n!554s', 'n!55@', 'n!55@5', 'n!55@s', 'n!55a', 'n!55a5', 'n!55as', 'n!5g4', 'n!5g45', 'n!5g4s', 'n!5g@', 'n!5g@5', 'n!5g@s', 'n!5ga', 'n!5ga5', 'n!5gas', 'n!5p4', 'n!5p45', 'n!5p4s', 'n!5p@', 'n!5p@5', 'n!5p@s', 'n!5pa', 'n!5pa5', 'n!5pas', 'n!5q4', 'n!5q45', 'n!5q4s', 'n!5q@', 'n!5q@5', 'n!5q@s', 'n!5qa', 'n!5qa5', 'n!5qas', 'n!bb', 'n!bb3r', 'n!bb4', 'n!bb@', 'n!bba', 'n!bber', 'n!g', 'n!g3r', 'n!g4', 'n!g54', 'n!g545', 'n!g54s', 'n!g5@', 'n!g5@5', 'n!g5@s', 'n!g5a', 'n!g5a5', 'n!g5as', 'n!g@', 'n!ga', 'n!ger', 'n!gg', 'n!gg3r', 'n!gg4', 'n!gg45', 'n!gg4s', 'n!gg@', 'n!gg@5', 'n!gg@s', 'n!gga', 'n!gga5', 'n!ggas', 'n!gger', 'n!gp', 'n!gp3r', 'n!gp4', 'n!gp45', 'n!gp4s', 'n!gp@', 'n!gp@5', 'n!gp@s', 'n!gpa', 'n!gpa5', 'n!gpas', 'n!gper', 'n!gq', 'n!gq3r', 'n!gq4', 'n!gq45', 'n!gq4s', 'n!gq@', 'n!gq@5', 'n!gq@s', 'n!gqa', 'n!gqa5', 'n!gqas', 'n!gqer', 'n!kker', 'n!kkers', 'n!p', 'n!p3r', 'n!p4', 'n!p54', 'n!p545', 'n!p54s', 'n!p5@', 'n!p5@5', 'n!p5@s', 'n!p5a', 'n!p5a5', 'n!p5as', 'n!p@', 'n!pa', 'n!per', 'n!pg', 'n!pg3r', 'n!pg4', 'n!pg45', 'n!pg4s', 'n!pg@', 'n!pg@5', 'n!pg@s', 'n!pga', 'n!pga5', 'n!pgas', 'n!pger', 'n!pp', 'n!pp3r', 'n!pp4', 'n!pp45', 'n!pp4s', 'n!pp@', 'n!pp@5', 'n!pp@s', 'n!ppa', 'n!ppa5', 'n!ppas', 'n!pper', 'n!pq', 'n!pq3r', 'n!pq4', 'n!pq45', 'n!pq4s', 'n!pq@', 'n!pq@5', 'n!pq@s', 'n!pqa', 'n!pqa5', 'n!pqas', 'n!pqer', 'n!q', 'n!q3r', 'n!q4', 'n!q54', 'n!q545', 'n!q54s', 'n!q5@', 'n!q5@5', 'n!q5@s', 'n!q5a', 'n!q5a5', 'n!q5as', 'n!q@', 'n!qa', 'n!qer', 'n!qg', 'n!qg3r', 'n!qg4', 'n!qg45', 'n!qg4s', 'n!qg@', 'n!qg@5', 'n!qg@s', 'n!qga', 'n!qga5', 'n!qgas', 'n!qger', 'n!qp', 'n!qp3r', 'n!qp4', 'n!qp45', 'n!qp4s', 'n!qp@', 'n!qp@5', 'n!qp@s', 'n!qpa', 'n!qpa5', 'n!qpas', 'n!qper', 'n!qq', 'n!qq3r', 'n!qq4', 'n!qq45', 'n!qq4s', 'n!qq@', 'n!qq@5', 'n!qq@s', 'n!qqa', 'n!qqa5', 'n!qqas', 'n!qqer', 'n1554', 'n15545', 'n1554s', 'n155@', 'n155@5', 'n155@s', 'n155a', 'n155a5', 'n155as', 'n15g4', 'n15g45', 'n15g4s', 'n15g@', 'n15g@5', 'n15g@s', 'n15ga', 'n15ga5', 'n15gas', 'n15p4', 'n15p45', 'n15p4s', 'n15p@', 'n15p@5', 'n15p@s', 'n15pa', 'n15pa5', 'n15pas', 'n15q4', 'n15q45', 'n15q4s', 'n15q@', 'n15q@5', 'n15q@s', 'n15qa', 'n15qa5', 'n15qas', 'n166a', 'n166as', 'n1bb', 'n1bb3r', 'n1bb4', 'n1bb@', 'n1bba', 'n1bber', 'n1g', 'n1g3r', 'n1g4', 'n1g54', 'n1g545', 'n1g54s', 'n1g5@', 'n1g5@5', 'n1g5@s', 'n1g5a', 'n1g5a5', 'n1g5as', 'n1g@', 'n1ga', 'n1ger', 'n1gg', 'n1gg3r', 'n1gg3rs', 'n1gg3st', 'n1gg4', 'n1gg45', 'n1gg4s', 'n1gg@', 'n1gg@5', 'n1gg@s', 'n1gga', 'n1gga5', 'n1ggas', 'n1gger', 'n1ggest', 'n1gl3t', 'n1glet', 'n1gn0g', 'n1gnog', 'n1gp', 'n1gp3r', 'n1gp4', 'n1gp45', 'n1gp4s', 'n1gp@', 'n1gp@5', 'n1gp@s', 'n1gpa', 'n1gpa5', 'n1gpas', 'n1gper', 'n1gq', 'n1gq3r', 'n1gq4', 'n1gq45', 'n1gq4s', 'n1gq@', 'n1gq@5', 'n1gq@s', 'n1gqa', 'n1gqa5', 'n1gqas', 'n1gqer', 'n1p', 'n1p3r', 'n1p4', 'n1p54', 'n1p545', 'n1p54s', 'n1p5@', 'n1p5@5', 'n1p5@s', 'n1p5a', 'n1p5a5', 'n1p5as', 'n1p@', 'n1pa', 'n1per', 'n1pg', 'n1pg3r', 'n1pg4', 'n1pg45', 'n1pg4s', 'n1pg@', 'n1pg@5', 'n1pg@s', 'n1pga', 'n1pga5', 'n1pgas', 'n1pger', 'n1pp', 'n1pp3r', 'n1pp4', 'n1pp45', 'n1pp4s', 'n1pp@', 'n1pp@5', 'n1pp@s', 'n1ppa', 'n1ppa5', 'n1ppas', 'n1pper', 'n1pq', 'n1pq3r', 'n1pq4', 'n1pq45', 'n1pq4s', 'n1pq@', 'n1pq@5', 'n1pq@s', 'n1pqa', 'n1pqa5', 'n1pqas', 'n1pqer', 'n1q', 'n1q3r', 'n1q4', 'n1q54', 'n1q545', 'n1q54s', 'n1q5@', 'n1q5@5', 'n1q5@s', 'n1q5a', 'n1q5a5', 'n1q5as', 'n1q@', 'n1qa', 'n1qer', 'n1qg', 'n1qg3r', 'n1qg4', 'n1qg45', 'n1qg4s', 'n1qg@', 'n1qg@5', 'n1qg@s', 'n1qga', 'n1qga5', 'n1qgas', 'n1qger', 'n1qp', 'n1qp3r', 'n1qp4', 'n1qp45', 'n1qp4s', 'n1qp@', 'n1qp@5', 'n1qp@s', 'n1qpa', 'n1qpa5', 'n1qpas', 'n1qper', 'n1qq', 'n1qq3r', 'n1qq4', 'n1qq45', 'n1qq4s', 'n1qq@', 'n1qq@5', 'n1qq@s', 'n1qqa', 'n1qqa5', 'n1qqas', 'n1qqer', 'n1qqurs', 'n33g4', 'n33ga', 'n33gg4', 'n33gga', 'naggers', 'neeg4', 'neega', 'neegg4', 'neegga', 'neger', 'negger', 'negro', 'negroes', 'ngiger', 'ngigers', 'ni33er', 'ni554', 'ni5545', 'ni554s', 'ni55@', 'ni55@5', 'ni55@s', 'ni55a', 'ni55a5', 'ni55as', 'ni5g4', 'ni5g45', 'ni5g4s', 'ni5g@', 'ni5g@5', 'ni5g@s', 'ni5ga', 'ni5ga5', 'ni5gas', 'ni5p4', 'ni5p45', 'ni5p4s', 'ni5p@', 'ni5p@5', 'ni5p@s', 'ni5pa', 'ni5pa5', 'ni5pas', 'ni5q4', 'ni5q45', 'ni5q4s', 'ni5q@', 'ni5q@5', 'ni5q@s', 'ni5qa', 'ni5qa5', 'ni5qas', 'ni66as', 'ni99a', 'ni99as', 'ni@@er', 'ni@@ers', 'nibb', 'nibb3r', 'nibb4', 'nibb@', 'nibba', 'nibbas', 'nibber', 'nibbers', 'nig', 'nig3r', 'nig4', 'nig54', 'nig545', 'nig54s', 'nig5@', 'nig5@5', 'nig5@s', 'nig5a', 'nig5a5', 'nig5as', 'nig@', 'niga', 'nigaa', 'nigaaa', 'nigas', 'nigbbga', 'niger', 'nigg', 'nigg3r', 'nigg3rs', 'nigg3st', 'nigg4', 'nigg45', 'nigg4s', 'nigg@', 'nigg@5', 'nigg@s', 'nigga', 'nigga5', 'niggaa', 'niggas', 'nigge', 'niggeer', 'nigger', 'nigger!', 'nigger!!', 'nigger!!!', 'nigger!!!!', 'nigger', 'nigger', 'nigger,', 'nigger-', 'nigger.', 'nigger0', 'nigger1', 'nigger10', 'nigger2', 'nigger3', 'nigger4', 'nigger5', 'nigger6', 'nigger7', 'nigger8', 'nigger9', 'nigger?', 'niggerboy', 'niggerfagg', 'niggerly', 'niggerm', 'niggerr', 'niggers', 'niggers', 'niggers-', 'niggest', 'nigggaaa', 'niggger', 'nigggger', 'niggrah', 'niggrahs', 'niggre', 'niggres', 'niggur', 'niggwer', 'niggwers', 'niglet', 'niglets', 'nign0g', 'nignog', 'nigp', 'nigp3r', 'nigp4', 'nigp45', 'nigp4s', 'nigp@', 'nigp@5', 'nigp@s', 'nigpa', 'nigpa5', 'nigpas', 'nigper', 'nigq', 'nigq3r', 'nigq4', 'nigq45', 'nigq4s', 'nigq@', 'nigq@5', 'nigq@s', 'nigqa', 'nigqa5', 'nigqas', 'nigqer', 'nigqur', 'nigur', 'nigya', 'nigyas', 'nikker', 'nikker0', 'nikker1', 'nikker2', 'nikker3', 'nikker4', 'nikker5', 'nikker6', 'nikker7', 'nikker8', 'nikker9', 'nikkers', 'nikkeur', 'nikkur', 'nikkurs', 'nip3r', 'nip4', 'nip54', 'nip545', 'nip54s', 'nip5@', 'nip5@5', 'nip5@s', 'nip5a', 'nip5a5', 'nip5as', 'nip@', 'nipa', 'niper', 'nipg', 'nipg3r', 'nipg4', 'nipg45', 'nipg4s', 'nipg@', 'nipg@5', 'nipg@s', 'nipga', 'nipga5', 'nipgas', 'nipger', 'nipp', 'nipp3r', 'nipp4', 'nipp45', 'nipp4s', 'nipp@', 'nipp@5', 'nipp@s', 'nippa', 'nippa5', 'nippas', 'nipper', 'nipq', 'nipq3r', 'nipq4', 'nipq45', 'nipq4s', 'nipq@', 'nipq@5', 'nipq@s', 'nipqa', 'nipqa5', 'nipqas', 'nipqer', 'niq', 'niq3r', 'niq4', 'niq54', 'niq545', 'niq54s', 'niq5@', 'niq5@5', 'niq5@s', 'niq5a', 'niq5a5', 'niq5as', 'niq@', 'niqa', 'niqer', 'niqg', 'niqg3r', 'niqg4', 'niqg45', 'niqg4s', 'niqg@', 'niqg@5', 'niqg@s', 'niqga', 'niqga5', 'niqgas', 'niqger', 'niqgur', 'niqp', 'niqp3r', 'niqp4', 'niqp45', 'niqp4s', 'niqp@', 'niqp@5', 'niqp@s', 'niqpa', 'niqpa5', 'niqpas', 'niqper', 'niqq', 'niqq3r', 'niqq4', 'niqq45', 'niqq4s', 'niqq@', 'niqq@5', 'niqq@s', 'niqqa', 'niqqa5', 'niqqaa', 'niqqaaa', 'niqqas', 'niqqer', 'niqqqaa', 'niqqqaaa', 'niqqur', 'niqur', 'nl554', 'nl5545', 'nl554s', 'nl55@', 'nl55@5', 'nl55@s', 'nl55a', 'nl55a5', 'nl55as', 'nl5g4', 'nl5g45', 'nl5g4s', 'nl5g@', 'nl5g@5', 'nl5g@s', 'nl5ga', 'nl5ga5', 'nl5gas', 'nl5p4', 'nl5p45', 'nl5p4s', 'nl5p@', 'nl5p@5', 'nl5p@s', 'nl5pa', 'nl5pa5', 'nl5pas', 'nl5q4', 'nl5q45', 'nl5q4s', 'nl5q@', 'nl5q@5', 'nl5q@s', 'nl5qa', 'nl5qa5', 'nl5qas', 'nlbb3r', 'nlbb4', 'nlbb@', 'nlbba', 'nlbber', 'nlg', 'nlg3r', 'nlg4', 'nlg54', 'nlg545', 'nlg54s', 'nlg5@', 'nlg5@5', 'nlg5@s', 'nlg5a', 'nlg5a5', 'nlg5as', 'nlg@', 'nlga', 'nlger', 'nlgg', 'nlgg3r', 'nlgg4', 'nlgg45', 'nlgg4s', 'nlgg@', 'nlgg@5', 'nlgg@s', 'nlgga', 'nlgga5', 'nlggas', 'nlgger', 'nlggers', 'nlgp', 'nlgp3r', 'nlgp4', 'nlgp45', 'nlgp4s', 'nlgp@', 'nlgp@5', 'nlgp@s', 'nlgpa', 'nlgpa5', 'nlgpas', 'nlgper', 'nlgq', 'nlgq3r', 'nlgq4', 'nlgq45', 'nlgq4s', 'nlgq@', 'nlgq@5', 'nlgq@s', 'nlgqa', 'nlgqa5', 'nlgqas', 'nlgqer', 'nlp3r', 'nlp4', 'nlp54', 'nlp545', 'nlp54s', 'nlp5@', 'nlp5@5', 'nlp5@s', 'nlp5a', 'nlp5a5', 'nlp5as', 'nlp@', 'nlpa', 'nlper', 'nlpg', 'nlpg3r', 'nlpg4', 'nlpg45', 'nlpg4s', 'nlpg@', 'nlpg@5', 'nlpg@s', 'nlpga', 'nlpga5', 'nlpgas', 'nlpger', 'nlpp', 'nlpp3r', 'nlpp4', 'nlpp45', 'nlpp4s', 'nlpp@', 'nlpp@5', 'nlpp@s', 'nlppa', 'nlppa5', 'nlppas', 'nlpper', 'nlpq', 'nlpq3r', 'nlpq4', 'nlpq45', 'nlpq4s', 'nlpq@', 'nlpq@5', 'nlpq@s', 'nlpqa', 'nlpqa5', 'nlpqas', 'nlpqer', 'nlq', 'nlq3r', 'nlq4', 'nlq54', 'nlq545', 'nlq54s', 'nlq5@', 'nlq5@5', 'nlq5@s', 'nlq5a', 'nlq5a5', 'nlq5as', 'nlq@', 'nlqa', 'nlqer', 'nlqg', 'nlqg3r', 'nlqg4', 'nlqg45', 'nlqg4s', 'nlqg@', 'nlqg@5', 'nlqg@s', 'nlqga', 'nlqga5', 'nlqgas', 'nlqger', 'nlqp', 'nlqp3r', 'nlqp4', 'nlqp45', 'nlqp4s', 'nlqp@', 'nlqp@5', 'nlqp@s', 'nlqpa', 'nlqpa5', 'nlqpas', 'nlqper', 'nlqq', 'nlqq3r', 'nlqq4', 'nlqq45', 'nlqq4s', 'nlqq@', 'nlqq@5', 'nlqq@s', 'nlqqa', 'nlqqa5', 'nlqqas', 'nlqqer', 'nuggu', 'nugguh', 'nwigger', 'nwiggers', 'r3g!n', 'r3g1n', 'r3gg!n', 'r3gg1n', 'r3ggin', 'r3ggln', 'r3gin', 'r3gln', 'r3gp!n', 'r3gp1n', 'r3gpin', 'r3gpln', 'r3gq!n', 'r3gq1n', 'r3gqin', 'r3gqln', 'r3p!n', 'r3p1n', 'r3pg!n', 'r3pg1n', 'r3pgin', 'r3pgln', 'r3pin', 'r3pln', 'r3pp!n', 'r3pp1n', 'r3ppin', 'r3ppln', 'r3pq!n', 'r3pq1n', 'r3pqin', 'r3pqln', 'r3q!n', 'r3q1n', 'r3qg!n', 'r3qg1n', 'r3qgin', 'r3qgln', 'r3qin', 'r3qln', 'r3qp!n', 'r3qp1n', 'r3qpin', 'r3qpln', 'r3qq!n', 'r3qq1n', 'r3qqin', 'r3qqln', 'reg!n', 'reg1n', 'regg!n', 'regg1n', 'reggin', 'reggln', 'regin', 'regln', 'regp!n', 'regp1n', 'regpin', 'regpln', 'regq!n', 'regq1n', 'regqin', 'regqln', 'rep!n', 'rep1n', 'repg!n', 'repg1n', 'repgin', 'repgln', 'repin', 'repln', 'repp!n', 'repp1n', 'reppin', 'reppln', 'repq!n', 'repq1n', 'repqin', 'repqln', 'req!n', 'req1n', 'reqg!n', 'reqg1n', 'reqgin', 'reqgln', 'reqin', 'reqln', 'reqp!n', 'reqp1n', 'reqpin', 'reqpln', 'reqq!n', 'reqq1n', 'reqqin', 'reqqln', 'sr3gg1n', 'sr3ggin', 'sregg1n', 'sreggin', 'viperalt', 'viperalts', 'w1gg3r', 'w1gga', 'w1gger', 'wigger', ]

    if (message.guild) {
      const key = `${message.guild.id}-${message.author.id}`;
  
      client.hist.ensure(key, {
        user: message.author.id,
        guild: message.guild.id,
        racism: 0,
        ads: 0,
        threat: 0,
        child: 0,
        lastSeen: new Date()
      });
  
      client.warns.ensure(key, {
        user: message.author.id,
        guild: message.guild.id,
        warns: 0,
        lastSeen: new Date()
      });

      client.toggle.ensure(key, {
        user: message.author.id,
        guild: message.guild.id,
        toggle: "on",
        lastSeen: new Date()
      });

      client.poll.ensure(key, {
        user: message.author.id,
        guild: message.guild.id,
        poll: "Test poll!",
        server: "Server",
        lastSeen: new Date()
      });

      client.suggest.ensure(key, {
        user: message.author.id,
        guild: message.guild.id,
        suggest: "Test suggestion!",
        server: "Server",
        lastSeen: new Date()
      });

      client.child.ensure(key, {
        user: message.author.id,
        guild: message.guild.id,
        child: 0,
        lastSeen: new Date()
      });
  
    }

    const key = `${message.guild.id}-${message.author.id}`;
    let status = client.toggle.get(key, "toggle");

    if (status === "off") {
      
    } else {
    
    if(blockedWords.some(word => message.content.includes(word)) ) {
      message.delete();

    const key = `${message.guild.id}-${message.author.id}`;
    let user = message.author;
    let member = message.guild.member(user);
    let mutedRole = message.guild.roles.find("name", "Muted");
    let curOff = client.hist.get(key, "racism");

    // 1st Offense - Warn

    if (curOff === 0) {
      client.hist.inc(key, "racism");
      client.warns.inc(key, "warns");
      message.channel.send(`**[WARN]** ${user.tag} has been warned for **Racism/Disrespect**!`);
      user.send(`You have been warned for **Racism/Disrespect**.`);
      let warnEmbed = new Discord.RichEmbed()
      .setTitle(`[WARN] - ${user.tag}`)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#6aaf6a")
      .addField("User Punished", `${user}`, true)
      .addField("Moderator", `${message.author}`, true)
      .addField("Reason", "Racism/Disrespect", true)
      .addField("Channel Punished", message.channel, true)
      .addField("Current Offense", "1st", true)
      .addField("User's ID", `${user.id}`, true)
      .setTimestamp(new Date());

      let logs = message.guild.channels.find("name", "mod-log");
      if (!logs) return message.reply("Invalid Channel.")
      logs.send(warnEmbed);

      setTimeout(function() {
          client.hist.set(key, {
              racism: 0
          });
      }, ms("1d"));

      setTimeout(function() {
        client.warns.math(key, "-", 1, "warns");
      }, ms("7d"));

      return;

      // 2nd Offense - 30 Minute Mute

  } else if (curOff === 1) {
      client.hist.inc(key, "racism");
      message.channel.send(`**[TEMP MUTE]** ${user.tag} has been temporarily muted for 30 minutes for **Racism/Disrespect**!`);
      user.send(`You have been temporarily muted for 30 minutes for **Racism/Disrespect**.`);
      member.addRole(mutedRole);
      let tmuteEmbed = new Discord.RichEmbed()
      .setTitle(`[TEMP MUTE] - ${user.tag}`)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#6aaf6a")
      .addField("User Punished", `${user}`, true)
      .addField("Moderator", `${message.author}`, true)
      .addField("Reason", "Racism/Disrespect", true)
      .addField("Channel Punished", message.channel, true)
      .addField("User's ID", `${user.id}`, true)
      .addField("Duration", "30 Minutes", true)
      .setTimestamp(new Date());

      let logs = message.guild.channels.find("name", "mod-log");
      if (!logs) return message.reply("Invalid Channel.")
      logs.send(tmuteEmbed);

      setTimeout(function() {
          member.removeRole(mutedRole);
          let unmuteEmbed = new Discord.RichEmbed()
          .setTitle(`[UNMUTE] - ${user.tag}`)
          .setColor("#6aaf6a")
          .addField("Moderator", `<@483740177819238401>`, true)
          .addField("Reason", "Mute Time Expired", true)
          .setTimestamp(new Date());

          logs.send(unmuteEmbed);
      }, ms("30m"));

      return;

      // 3rd Offense - 1 Hour Mute

  } else if (curOff === 2) {
      client.hist.inc(key, "racism");
      message.channel.send(`**[TEMP MUTE]** ${user.tag} has been temporarily muted for 1 hour for **Racism/Disrespect**!`);
      user.send(`You have been temporarily muted for 1 hour for **Racism/Disrespect**.`);
      member.addRole(mutedRole);
      let tmuteEmbed = new Discord.RichEmbed()
      .setTitle(`[TEMP MUTE] - ${user.tag}`)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#6aaf6a")
      .addField("User Punished", `${user}`, true)
      .addField("Moderator", `${message.author}`, true)
      .addField("Reason", "Racism/Disrespect", true)
      .addField("Channel Punished", message.channel, true)
      .addField("User's ID", `${user.id}`, true)
      .addField("Duration", "1 hour", true)
      .setTimestamp(new Date());

      let logs = message.guild.channels.find("name", "mod-log");
      if (!logs) return message.reply("Invalid Channel.")
      logs.send(tmuteEmbed);

      setTimeout(function() {
          member.removeRole(mutedRole);
          let unmuteEmbed = new Discord.RichEmbed()
          .setTitle(`[UNMUTE] - ${user.tag}`)
          .setColor("#6aaf6a")
          .addField("Moderator", `<@483740177819238401>`, true)
          .addField("Reason", "Mute Time Expired", true)
          .setTimestamp(new Date());

          logs.send(unmuteEmbed);
      }, ms("1h"));

      return;

      // 4th Offense - 1 Day Mute

  } else if (curOff === 3) {
      client.hist.inc(key, "racism");
      message.channel.send(`**[TEMP MUTE]** ${user.tag} has been temporarily muted for 1 day for **Racism/Disrespect**!`);
      user.send(`You have been temporarily muted for 1 day for **Racism/Disrespect**.`);
      member.addRole(mutedRole);
      let tmuteEmbed = new Discord.RichEmbed()
      .setTitle(`[TEMP MUTE] - ${user.tag}`)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#6aaf6a")
      .addField("User Punished", `${user}`, true)
      .addField("Moderator", `${message.author}`, true)
      .addField("Reason", "Racism/Disrespect", true)
      .addField("Channel Punished", message.channel, true)
      .addField("User's ID", `${user.id}`, true)
      .addField("Duration", "1 day", true)
      .setTimestamp(new Date());

      let logs = message.guild.channels.find("name", "mod-log");
      if (!logs) return message.reply("Invalid Channel.")
      logs.send(tmuteEmbed);

      setTimeout(function() {
          member.removeRole(mutedRole);
          let unmuteEmbed = new Discord.RichEmbed()
          .setTitle(`[UNMUTE] - ${user.tag}`)
          .setColor("#6aaf6a")
          .addField("Moderator", `<@483740177819238401>`, true)
          .addField("Reason", "Mute Time Expired", true)
          .setTimestamp(new Date());

          logs.send(unmuteEmbed);
      }, ms("1d"));
  }

}

    }

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

client.login(config.token);