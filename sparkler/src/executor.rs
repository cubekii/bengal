use crate::vm::VM;

pub struct Bytecode {
    pub data: Vec<u8>,
    pub strings: Vec<String>,
}

pub struct Executor {
    vm: VM,
}

impl Executor {
    pub fn new() -> Self {
        Self {
            vm: VM::new(),
        }
    }

    pub fn run(&mut self, bytecode: Bytecode) -> Result<(), String> {
        self.vm.load(&bytecode.data, bytecode.strings)?;
        self.vm.run()
    }
}

impl Default for Executor {
    fn default() -> Self {
        Self::new()
    }
}
