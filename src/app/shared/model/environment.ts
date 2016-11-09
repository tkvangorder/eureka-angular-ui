export class Environment {

    static allEnvironment : Environment[] = [
        {value:"", display:"All"},
        {value:"local", display:"Local"},
        {value:"dev", display:"Development"},
        {value:"qa", display:"QA"},
        {value:"test", display:"Test"},
        {value:"train", display:"Training"},
        {value:"staging", display:"Staging"},
        {value:"sandbox", display:"Sandbox"},
        {value:"production", display:"Production"},
    ];     

  value: string;
  display: string;
}
